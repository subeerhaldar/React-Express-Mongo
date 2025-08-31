import { useState, useEffect } from 'react';
import axios from 'axios';

function AddItemForm({ onItemAdded, isEditing, itemToEdit, onItemUpdated }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Populate form when editing
    useEffect(() => {
        if (isEditing && itemToEdit) {
            setFormData({
                name: itemToEdit.name || '',
                description: itemToEdit.description || '',
                price: itemToEdit.price?.toString() || '',
                quantity: itemToEdit.quantity?.toString() || ''
            });
        } else {
            // Reset form when not editing
            setFormData({
                name: '',
                description: '',
                price: '',
                quantity: ''
            });
        }
    }, [isEditing, itemToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError(null);
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError('Name is required');
            return false;
        }
        if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) < 0) {
            setError('Please enter a valid price (must be a positive number)');
            return false;
        }
        if (!formData.quantity || isNaN(formData.quantity) || parseInt(formData.quantity) < 0) {
            setError('Please enter a valid quantity (must be a non-negative integer)');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const itemData = {
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity)
            };

            let response;
            if (isEditing && itemToEdit) {
                // Update existing item
                response = await axios.put(`/api/items/${itemToEdit._id}`, itemData);
                if (onItemUpdated) {
                    onItemUpdated(response.data);
                }
            } else {
                // Add new item
                response = await axios.post('/api/items', itemData);
                if (onItemAdded) {
                    onItemAdded(response.data);
                }
            }

            setSuccess(true);

            // Reset form after successful operation
            if (!isEditing) {
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    quantity: ''
                });
            }

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);

        } catch (err) {
            setError(err.response?.data?.message || err.message || `Failed to ${isEditing ? 'update' : 'add'} item`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-item-form box">
            <h2>{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter item name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter item description (optional)"
                        rows="3"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price *</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity *</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        required
                    />
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">Item added successfully!</div>}

                <button
                    type="submit"
                    disabled={loading}
                    className="submit-btn"
                >
                    {loading ? (isEditing ? 'Updating Item...' : 'Adding Item...') : (isEditing ? 'Update Item' : 'Add Item')}
                </button>
            </form>
        </div>
    );
}

export default AddItemForm;