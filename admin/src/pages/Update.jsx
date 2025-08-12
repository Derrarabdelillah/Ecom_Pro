import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { assets } from '../assets/admin_assets/assets';
import { useParams } from 'react-router-dom';

const Update = ({ token }) => {
    const backendUrl = "https://ecom-pro-0qxb.onrender.com";
    const { id } = useParams();

    // Loading states
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    // Product state
    const [updatedProduct, setUpdatedProduct] = useState({
        name: '',
        description: '',
        stock: 0,
        category: 'Men',
        subCategory: 'TopWear',
        price: '',
        bestseller: false,
        image: []
    });

    // Image states
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    // Attribute states
    const [attributes, setAttributes] = useState([]);
    const [attrName, setAttrName] = useState('');
    const [attrValue, setAttrValue] = useState('');
    const [attrValues, setAttrValues] = useState([]);

    // Confirmation modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [attributeToDelete, setAttributeToDelete] = useState('');

    // Add value to current attribute
    const handleAddValue = () => {
        if (!attrName) {
            toast.warning('Please enter an attribute name first', {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }
        if (!attrValue) {
            toast.warning('Please enter a value', {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }
        if (attrValues.includes(attrValue)) {
            toast.warning('This value already exists', {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }

        setAttrValues([...attrValues, attrValue]);
        setAttrValue('');
    };

    // Add attribute with its values
    const handleAddAttribute = () => {
        if (!attrName) {
            toast.warning('Please enter an attribute name', {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }
        if (attrValues.length === 0) {
            toast.warning('Please add at least one value', {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }

        setAttributes([...attributes, { name: attrName, values: attrValues }]);
        setAttrName('');
        setAttrValues([]);
        toast.success('Attribute added successfully', {
            position: "top-right",
            autoClose: 2000
        });
    };

    // Remove attribute
    const handleRemoveAttribute = (name) => {
        setAttributes(attributes.filter(attr => attr.name !== name));
        toast.info(`Attribute "${name}" removed`, {
            position: "top-right",
            autoClose: 2000
        });
    };

    // Remove value from current attribute
    const handleRemoveValue = (value) => {
        setAttrValues(attrValues.filter(v => v !== value));
        toast.info(`Value "${value}" removed`, {
            position: "top-right",
            autoClose: 2000
        });
    };

    const updateProduct = async () => {
        if (!updatedProduct.name || !updatedProduct.description || !updatedProduct.price) {
            toast.error('Please fill in all required fields', {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }

        setIsUpdating(true);
        const formData = new FormData();

        formData.append('name', updatedProduct.name);
        formData.append('description', updatedProduct.description);
        formData.append('stock', updatedProduct.stock);
        formData.append('category', updatedProduct.category);
        formData.append('subCategory', updatedProduct.subCategory);
        formData.append('price', updatedProduct.price);
        formData.append('bestseller', updatedProduct.bestseller);
        formData.append('attributes', JSON.stringify(attributes));

        // Append images if they exist
        if (image1) formData.append('image1', image1);
        if (image2) formData.append('image2', image2);
        if (image3) formData.append('image3', image3);
        if (image4) formData.append('image4', image4);

        try {
            const response = await axios.put(`${backendUrl}/api/product/update/${id}`, formData);

            if (response.data.success) {
                toast.success("Product updated successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        fontSize: 'clamp(12px, 3vw, 16px)',
                        maxWidth: '90vw',
                        margin: '0 auto',
                        width: 'auto',
                    },
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating product!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    fontSize: 'clamp(12px, 3vw, 16px)',
                    maxWidth: '90vw',
                    margin: '0 auto',
                    width: 'auto',
                },
            });
        } finally {
            setIsUpdating(false);
        }
    };

    // Fetch product data
    useEffect(() => {
        if (id) {
            const getProduct = async () => {
                try {
                    const response = await axios.get(`${backendUrl}/api/product/single/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const product = response.data.product;
                    setUpdatedProduct({
                        name: product.name || '',
                        description: product.description || '',
                        stock: product.stock || 0,
                        category: product.category || 'Men',
                        subCategory: product.subCategory || 'TopWear',
                        price: product.price || '',
                        bestseller: product.bestseller || false,
                        image: product.image || []
                    });

                    if (product.attributes) {
                        setAttributes(Array.isArray(product.attributes) ? product.attributes : []);
                    }
                } catch (error) {
                    toast.error('Failed to load product data');
                } finally {
                    setIsFetching(false);
                }
            };
            getProduct();
        }
    }, [id, token]);

    // Helper function to get image URL
    const getImageUrl = (index) => {
        const images = [image1, image2, image3, image4];
        if (images[index]) return URL.createObjectURL(images[index]);
        return updatedProduct.image?.[index] || assets.upload_area;
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
                <span className="ml-3 text-lg">Loading product data...</span>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col justify-start shadow-md bg-white px-4 py-6 rounded-lg">
                <ToastContainer />
                <div className="flex flex-col gap-6">

                    {/* Image Upload Section */}
                    <div className="flex flex-col gap-2">
                        <h3 className='text-lg font-medium'>Upload Images</h3>
                        <p className="text-sm text-gray-500">Upload up to 4 images (First image will be the main display)</p>
                        <div className="flex flex-row gap-3 items-center">
                            {[0, 1, 2, 3].map((index) => (
                                <label key={index} htmlFor={`image${index + 1}`} className="cursor-pointer relative group">
                                    <img
                                        src={getImageUrl(index)}
                                        className={`w-22 rounded-lg ${[image1, image2, image3, image4][index] ? 'w-33 h-33 object-contain' : ''}`}
                                        alt={`Product image ${index + 1}`}
                                    />
                                    <div className="absolute inset-0   flex items-center justify-center rounded-lg transition-all duration-200">
                                        <FiPlus className="text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-200" size={24} />
                                    </div>
                                    <input
                                        onChange={(e) => {
                                            const setters = [setImage1, setImage2, setImage3, setImage4];
                                            setters[index](e.target.files[0]);
                                            toast.success(`Image ${index + 1} selected`, {
                                                position: "top-right",
                                                autoClose: 2000
                                            });
                                        }}
                                        type="file"
                                        id={`image${index + 1}`}
                                        className='hidden'
                                        accept="image/*"
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Product Name */}
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-lg font-medium'>Product Name</h3>
                        <input
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            type="text"
                            placeholder='Your Product Name...'
                            className='border border-grayBorder px-4 py-2 rounded-lg focus:ring-main focus:ring-1 outline-none'
                            required
                        />
                    </div>

                    {/* Product Description */}
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-lg font-medium'>Product Description</h3>
                        <textarea
                            value={updatedProduct.description}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                            placeholder='Your Product Description...'
                            className='border border-grayBorder px-4 py-2 rounded-lg focus:ring-main focus:ring-1 outline-none h-50 max-h-70 min-h-11'
                            required
                        />
                    </div>

                    {/* Product Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-2">
                            <h3 className='font-medium text-lg'>Product Category</h3>
                            <select
                                value={updatedProduct.category}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
                                className='border border-grayBorder px-4 py-2 rounded-lg outline-none'
                            >
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Kids">Kids</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className='font-medium text-lg'>Sub Category</h3>
                            <select
                                value={updatedProduct.subCategory}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, subCategory: e.target.value })}
                                className='border border-grayBorder px-4 py-2 rounded-lg outline-none'
                            >
                                <option value="TopWear">TopWear</option>
                                <option value="BottomWear">BottomWear</option>
                                <option value="WinterWear">WinterWear</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className='font-medium text-lg'>Product Price <span className="text-sm">(DA)</span></h3>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={updatedProduct.price}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                    placeholder='199.99'
                                    className='border border-grayBorder px-4 py-2 rounded-lg focus:ring-main focus:ring-1 outline-none pl-8'
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className='font-medium text-lg'>Stock Quantity</h3>
                            <input
                                type="number"
                                value={updatedProduct.stock}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, stock: e.target.value })}
                                placeholder='100'
                                className='border border-grayBorder px-4 py-2 rounded-lg focus:ring-main focus:ring-1 outline-none'
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Product Attributes */}
                    <div className="flex flex-col gap-2">
                        <h3 className='text-lg font-medium'>Product Attributes</h3>
                        <p className="text-sm text-gray-500">Add attributes like color, size, etc. to your product</p>

                        <div className="flex flex-col sm:flex-row gap-2 mb-2">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Attribute Name</label>
                                <input
                                    type="text"
                                    className="w-full border border-grayBorder px-4 py-2 rounded-lg focus:ring-main focus:ring-1 outline-none"
                                    placeholder="e.g. Color, Size"
                                    value={attrName}
                                    onChange={e => setAttrName(e.target.value)}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        className="flex-1 border border-grayBorder px-4 py-2 rounded-lg focus:ring-main focus:ring-1 outline-none"
                                        placeholder="e.g. Red, Blue"
                                        value={attrValue}
                                        onChange={e => setAttrValue(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddValue())}
                                    />
                                    <button
                                        type="button"
                                        className="cursor-pointer bg-main text-white px-3 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                                        onClick={handleAddValue}
                                        title="Add value"
                                    >
                                        <FiPlus />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {attrValues.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Current Values:</h4>
                                <div className="flex flex-row gap-2 flex-wrap">
                                    {attrValues.map((val, idx) => (
                                        <span key={idx} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg flex items-center gap-1">
                                            {val}
                                            <button
                                                type="button"
                                                className="cursor-pointer text-red-500 ml-1 font-bold hover:text-red-700"
                                                onClick={() => handleRemoveValue(val)}
                                                title="Remove value"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            type="button"
                            className={`cursor-pointer bg-main text-white px-4 py-2 rounded-lg font-medium w-fit mb-4 hover:bg-indigo-700 transition flex items-center gap-2 ${(!attrName || attrValues.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleAddAttribute}
                            disabled={!attrName || attrValues.length === 0}
                        >
                            <FiPlus />
                            Add Attribute
                        </button>

                        {attributes.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-gray-700">Current Attributes:</h4>
                                {attributes.map((attr) => (
                                    <div key={attr.name} className="flex flex-col sm:flex-row sm:items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                                        <div className="flex-1">
                                            <span className="font-semibold capitalize">{attr.name}:</span>
                                            <div className="flex flex-row gap-2 flex-wrap mt-1">
                                                {attr.values.map((v, i) => (
                                                    <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg">{v}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="cursor-pointer text-red-500 hover:text-red-700 font-bold flex items-center gap-1"
                                            onClick={() => {
                                                setAttributeToDelete(attr.name);
                                                setShowDeleteModal(true);
                                            }}
                                            title={`Remove ${attr.name} attribute`}
                                        >
                                            <FiTrash2 size={16} />
                                            <span className="sm:hidden">Remove</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Best Seller Toggle */}
                    <div className="flex flex-row gap-2 items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={updatedProduct.bestseller}
                                onChange={() => setUpdatedProduct({ ...updatedProduct, bestseller: !updatedProduct.bestseller })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-main"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900">Mark as Best Seller</span>
                        </label>
                    </div>

                    {/* Update Button */}
                    <button
                        onClick={updateProduct}
                        disabled={isUpdating}
                        className={`flex flex-row items-center justify-center font-bold px-4 py-3 cursor-pointer gap-2 bg-gradient-to-tr from-main to-indigo-600 text-white rounded-lg hover:scale-[1.01] transition-all ${isUpdating ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isUpdating ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Updating...
                            </>
                        ) : (
                            <>
                                <FiEdit />
                                <span>Update Product</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-red-100">
                                <FiTrash2 className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Confirm Deletion
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete the "{attributeToDelete}" attribute? This action cannot be undone.
                            </p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        handleRemoveAttribute(attributeToDelete);
                                        setShowDeleteModal(false);
                                    }}
                                    className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition flex items-center justify-center gap-2"
                                >
                                    <FiTrash2 />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Update;