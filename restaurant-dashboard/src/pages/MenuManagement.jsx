import React, { useState } from "react";

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Cheeseburger",
      price: 129.99,
      category: "Meals",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      name: "Caesar Salad",
      price: 99.99,
      category: "Salads",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "Fries",
      price: 49.99,
      category: "Snacks",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=200&q=80",
    },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "Snacks",
    image: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewItem({ ...newItem, image: imageURL });
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price || !newItem.image)
      return alert("Please fill all fields and add an image.");
    const newId = menuItems.length ? menuItems[menuItems.length - 1].id + 1 : 1;
    setMenuItems([
      ...menuItems,
      {
        id: newId,
        ...newItem,
        price: parseFloat(newItem.price),
      },
    ]);
    setNewItem({ name: "", price: "", category: "Snacks", image: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setMenuItems(menuItems.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (item) => setEditingItem(item);

  const handleSave = (id, updated) => {
    setMenuItems(menuItems.map((i) => (i.id === id ? { ...i, ...updated } : i)));
    setEditingItem(null);
  };

  const formatRupees = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center gap-2">
              🍽️ Menu Management
            </h1>
            <p className="text-gray-600">
              Add, update, and manage your restaurant menu with images and
              categories.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-4 sm:mt-0">
            <input
              type="text"
              placeholder="🔍 Search item or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none w-64"
            />
          </div>
        </div>

        {/* Add Item Form */}
        <form
          onSubmit={handleAdd}
          className="flex flex-wrap gap-4 bg-blue-50/70 p-5 rounded-xl shadow-inner mb-10"
        >
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={newItem.name}
            onChange={handleChange}
            className="flex-1 min-w-[200px] border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={newItem.price}
            onChange={handleChange}
            className="w-36 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Category Selector */}
          <select
            name="category"
            value={newItem.category}
            onChange={handleChange}
            className="w-40 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option>Snacks</option>
            <option>Meals</option>
            <option>Drinks</option>
            <option>Desserts</option>
            <option>Salads</option>
          </select>

          {/* Image Upload */}
          <label className="flex items-center justify-center border border-gray-300 rounded-xl bg-white cursor-pointer px-4 py-3 hover:bg-gray-100 transition">
            📸 Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
          >
            ➕ Add Item
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Item Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price (₹)</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredItems.length ? (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-blue-50 transition-all"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-sm"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {editingItem?.id === item.id ? (
                        <input
                          type="text"
                          defaultValue={item.name}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              name: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-lg px-3 py-1 w-full"
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {editingItem?.id === item.id ? (
                        <select
                          defaultValue={item.category}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              category: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-lg px-3 py-1"
                        >
                          <option>Snacks</option>
                          <option>Meals</option>
                          <option>Drinks</option>
                          <option>Desserts</option>
                          <option>Salads</option>
                        </select>
                      ) : (
                        item.category
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {editingItem?.id === item.id ? (
                        <input
                          type="number"
                          defaultValue={item.price}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              price: parseFloat(e.target.value),
                            })
                          }
                          className="border border-gray-300 rounded-lg px-3 py-1 w-24"
                        />
                      ) : (
                        formatRupees(item.price)
                      )}
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      {editingItem?.id === item.id ? (
                        <button
                          onClick={() => handleSave(item.id, editingItem)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
                        >
                          💾 Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-3 py-1 rounded-lg"
                        >
                          ✏️ Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No menu items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
