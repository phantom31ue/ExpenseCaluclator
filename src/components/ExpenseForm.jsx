import { useState } from "react";
import categories from "../categories";

function ExpenseForm({ onSubmit }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (description.length < 3) {
      newErrors.description = "Description should be at least 3 characters.";
    }

    if (description.length > 50) {
      newErrors.description = "Description should be at most 50 characters.";
    }

    if (isNaN(amount) || amount < 0.01) {
      newErrors.amount = "Amount should be at least 0.01.";
    }

    if (amount > 100000) {
      newErrors.amount = "Amount should be at most 100000.";
    }

    if (!category) {
      newErrors.category = "Category is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = {
        description,
        amount: parseFloat(amount),
        category,
      };

      onSubmit(formData);

      setDescription("");
      setAmount("");
      setCategory("");
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && <p className="text-danger">{errors.amount}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="category"
          className="form-select"
        >
          <option value="">Select an option</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-danger">{errors.category}</p>}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default ExpenseForm;
