import AccessRestrictedState from "../template/AccessRestrictedState";
import type { QueryHandlingProps } from "./types";

const QueryHandling = <T,>({
  queryResult,
  render,
  bypassForbidden = true,
  ...props
}: QueryHandlingProps<T>) => {
  const { data, isLoading, isFetching, isError, isSuccess, error } =
    queryResult;

  if (isLoading && isFetching) {
    return props.renderLoading !== undefined ? (
      props.renderLoading
    ) : (
      <p>Loading...</p>
    );
  }

  if (isError) {
    const status = (error as { status?: number })?.status;

    if (status === 404) {
      return props.renderNotFound ? (
        props.renderNotFound
      ) : (
        <p>Data not found</p>
      );
    }

    if (status === 403 && !bypassForbidden) {
      return props.renderForbidden ? (
        props.renderForbidden
      ) : (
        <AccessRestrictedState />
      );
    }

    return props.renderError ? props.renderError : <p>Error</p>;
  }

  if (isSuccess && data) {
    if (props.checkEmpty?.(data) && props.renderEmpty) {
      return props.renderEmpty;
    }

    return render(data);
  }

  return "Something when wrong";
};

export default QueryHandling;
