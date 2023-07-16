import categories from "../categories";

function ExpenseFilter({ onSelectCategory }) {
  const handleCategoryChange = (event) => {
    onSelectCategory(event.target.value);
  };
  return (
    <select className="form-select" onChange={handleCategoryChange}>
      <option value="">All categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}

export default ExpenseFilter;
