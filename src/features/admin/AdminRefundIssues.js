import {
  useRefundOrderMutation,
  useGetRefundIssuesQuery,
} from "./adminApiSlice";

const AdminRefundIssues = () => {
  const [
    refundOrder,
    { isLoading: isRefundOrderLoading, isSuccess: isRefundOrderSuccess },
  ] = useRefundOrderMutation();
  const { data: refundIssues, isLoading: isRefundIssuesLoading } =
    useGetRefundIssuesQuery();

  const handleRefundOrder = async (issueId) => {
    await refundOrder({ issueId });
  };

  return (
    <div>
      <h1>Refund Issues</h1>
      {isRefundIssuesLoading ? <p>Loading...</p> : null}
      {refundIssues?.map((issue) => (
        <div key={issue._id}>
          <p>Order ID: {issue.order}</p>
          <p>Reason: {issue.reason}</p>
          <p>Status: {issue.status}</p>
          <button onClick={() => handleRefundOrder(issue._id)}>Refund</button>
        </div>
      ))}
      {!refundIssues?.length && !isRefundIssuesLoading ? (
        <p>No refund issues</p>
      ) : null}
      {isRefundOrderLoading ? <p>Refunding...</p> : null}
      {isRefundOrderSuccess ? <p>Refund Success!</p> : null}
    </div>
  );
};

export default AdminRefundIssues;
