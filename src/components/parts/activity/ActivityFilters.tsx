"use client";

import { useForm, useStore } from "@tanstack/react-form";
import { Info, Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BasicAvatar } from "@/components/ui/avatar";
import { DatePicker } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auditEventTypeLabel } from "@/constants/audit";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useWorkspaceUsage } from "@/query/workspace";
import type { AuditEventType } from "@/types/audit";
import type { Project } from "@/types/project";
import type { WorkspaceMember } from "@/types/workspace";

export type ActivityFilterValues = {
  eventType?: AuditEventType;
  userId?: string;
  projectSlug?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
};

type ActivityFiltersProps = {
  members: WorkspaceMember[];
  projects?: Project[];
  allowEventTypes?: AuditEventType[];
  onFiltersChange: (values: ActivityFilterValues) => void;
};

const SELECT_ALL = "";

const ActivityFilters = ({
  members,
  projects,
  allowEventTypes,
  onFiltersChange,
}: ActivityFiltersProps) => {
  const { workspaceSlug } = useParams<{ workspaceSlug: string }>();
  const [searchInput, setSearchInput] = useState("");
  const isInitial = useRef(true);
  const debouncedSearch = useDebounce(searchInput, 400);

  const { data: usageData, isLoading } = useWorkspaceUsage(workspaceSlug);
  const auditLogRetention = usageData?.data?.data?.auditLogRetention;

  const isDateDisabled = isLoading || !!auditLogRetention?.limit;

  const form = useForm({
    defaultValues: {
      eventType: "",
      userId: "",
      projectSlug: "",
      startDate: "",
      endDate: "",
      search: "",
    },
    onSubmit: () => {},
  });

  const values = useStore(form.store, (state) => state.values);

  useEffect(() => {
    form.setFieldValue("search", debouncedSearch);
  }, [debouncedSearch, form.setFieldValue]);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    onFiltersChange({
      eventType: (values.eventType as AuditEventType) || undefined,
      userId: values.userId || undefined,
      projectSlug: values.projectSlug || undefined,
      startDate: values.startDate || undefined,
      endDate: values.endDate || undefined,
      search: values.search || undefined,
    });
  }, [values, onFiltersChange]);

  const getSelectedUser = useCallback(
    (selectedId: string) => {
      return members.find((member) => member.userId === selectedId);
    },
    [members],
  );

  return (
    <div className={cn("grid gap-3", projects ? "grid-cols-5" : "grid-cols-4")}>
      <form.Field name="eventType">
        {(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Event Type</FieldLabel>
            <Select
              value={field.state.value || SELECT_ALL}
              onValueChange={(val) => field.handleChange(val as string)}
            >
              <SelectTrigger>
                <SelectValue>
                  {field.state.value
                    ? auditEventTypeLabel[field.state.value as AuditEventType]
                    : "All events"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SELECT_ALL}>All events</SelectItem>
                {Object.entries(auditEventTypeLabel)
                  .filter(
                    ([key]) =>
                      !allowEventTypes ||
                      allowEventTypes.includes(key as AuditEventType),
                  )
                  .map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      </form.Field>

      <form.Field name="userId">
        {(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>User</FieldLabel>
            <Select
              value={field.state.value || SELECT_ALL}
              onValueChange={(val) => field.handleChange(val as string)}
            >
              <SelectTrigger>
                <SelectValue>
                  {field.state.value
                    ? getSelectedUser(field.state.value)?.email
                    : "All users"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SELECT_ALL}>All users</SelectItem>
                {members.map((member) => (
                  <SelectItem key={member.userId} value={member.userId}>
                    <div className="flex gap-2 items-center">
                      <BasicAvatar
                        name={member.name}
                        avatarUrl={member.avatarUrl}
                        size="sm"
                      />
                      <div className="flex flex-col">
                        <span>{member.email}</span>
                        <span className="typography-xsmall text-muted-foreground">
                          {member.name}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      </form.Field>

      {projects && (
        <form.Field name="projectSlug">
          {(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Project</FieldLabel>
              <Select
                value={field.state.value || SELECT_ALL}
                onValueChange={(val) => field.handleChange(val as string)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All projects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={SELECT_ALL}>All projects</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.slug} value={project.slug}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        </form.Field>
      )}

      <form.Field name="startDate">
        {(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>From</FieldLabel>
            <DatePicker
              value={field.state.value}
              onChange={field.handleChange}
              placeholder="Pick a date"
              disabled={isDateDisabled}
            />
          </Field>
        )}
      </form.Field>
      <form.Field name="endDate">
        {(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>To</FieldLabel>
            <DatePicker
              value={field.state.value}
              onChange={field.handleChange}
              placeholder="Pick a date"
              disabled={isDateDisabled}
            />
          </Field>
        )}
      </form.Field>

      <form.Field name="search">
        {() => (
          <InputGroup className={cn(projects ? "col-span-5" : "col-span-4")}>
            <InputGroupAddon>
              <Search className="size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search activity..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </InputGroup>
        )}
      </form.Field>

      {auditLogRetention?.limit && (
        <div className="col-span-full">
          <Alert variant="info">
            <Info />
            <AlertTitle>Date filter disabled</AlertTitle>
            <AlertDescription>
              Filtering by date is disabled because audit logs are retained for{" "}
              {auditLogRetention.limit} {auditLogRetention.unit ?? "days"} on
              your current plan.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default ActivityFilters;
