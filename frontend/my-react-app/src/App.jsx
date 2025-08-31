import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import AddItemForm from './AddItemForm';
import GridExample from './GridExample';
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleItemAdded = (newItem) => {
        setItems(prevItems => [...prevItems, newItem]);
        setRefreshTrigger(prev => prev + 1); // Trigger grid refresh
    };

    const handleEdit = (item) => {
        setIsEditing(true);
        setItemToEdit(item);
    };

    const handleItemUpdated = (updatedItem) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item._id === updatedItem._id ? updatedItem : item
            )
        );
        setIsEditing(false);
        setItemToEdit(null);
        setRefreshTrigger(prev => prev + 1); // Trigger grid refresh
    };
    
    useEffect(() => {
        const fetchItems = async () => {
            try {
                // Notice the relative path due to the proxy setup
                const response = await axios.get('/api/items');
                setItems(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []); // Empty dependency array means this runs once on component mount

    if (loading) return <p>Loading items...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="App">
            <h1>Items Management</h1>
            <div className="container">
            <AddItemForm
                onItemAdded={handleItemAdded}
                isEditing={isEditing}
                itemToEdit={itemToEdit}
                onItemUpdated={handleItemUpdated}
            />
            {/* <div className="items-section box">
                <h2>Items List</h2>
                {items.length === 0 ? (
                    <p>No items found. Add your first item above!</p>
                ) : (
                    <ul>
                        {items.map(item => (
                            <li key={item._id}>
                                <strong>{item.name}</strong> - ${item.price} (Qty: {item.quantity})
                                {item.description && <p className="item-description">{item.description}</p>}
                            </li>
                        ))}
                    </ul>
                )}
            </div> */}
             <GridExample onEdit={handleEdit} refreshTrigger={refreshTrigger} />
            </div>
        </div>
    );
}

export default App
