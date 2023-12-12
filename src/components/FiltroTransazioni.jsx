
function FiltroTransazioni({ onOrderByChange , orderBy }) {

    const handleOrderByChange = (event) => {
        const newOrderBy = (event.target.value);
        onOrderByChange(newOrderBy);
    }

    return (
        <div>
            <label htmlFor="orderBy">Order By:</label>
            <div className="select-box">
                <select id="orderBy" value={orderBy} onChange={handleOrderByChange}>
                    <option value="transactionID">Transaction ID</option>
                    <option value="transactionDate">Transaction Date</option>
                    <option value="transactionTypeName">Transaction Type</option>
                    <option value="transactionStatusName">Transaction Status</option>
                </select>
            </div>
        </div>
    );
}

export default FiltroTransazioni;
