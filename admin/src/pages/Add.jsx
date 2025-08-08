import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { assets } from '../assets/admin_assets/assets';

const Add = ({ token }) => {
  const backendUrl = "https://ecom-pro-0qxb.onrender.com";
  const [images, setImages] = useState(['', '', '', '']);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubSubCategory] = useState('TopWear');
  const [basePrice, setBasePrice] = useState('');
  const [bestseller, setBestseller] = useState(false);
  
  // Attributes state
  const [attributes, setAttributes] = useState([]);
  const [newAttribute, setNewAttribute] = useState({
    name: '',
    values: [{ value: '', priceAdjustment: 0 }]
  });

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const addProduct = async () => {
    const formData = new FormData();
    
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('basePrice', basePrice);
    formData.append('bestseller', bestseller);
    formData.append('attributes', JSON.stringify(attributes));
    
    images.forEach((image, index) => {
      if (image) formData.append(`image${index + 1}`, image);
    });

    try {
      const response = await axios.post(`${backendUrl}/api/product/add`, formData, { headers: token });
      
      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName('');
        setDescription('');
        setBasePrice('');
        setImages(['', '', '', '']);
        setBestseller(false);
        setAttributes([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding product!');
    }
  };

  // Attribute management functions
  const addAttribute = () => {
    if (!newAttribute.name.trim()) return;
    
    // Validate at least one value is provided
    const validValues = newAttribute.values.filter(v => v.value.trim());
    if (validValues.length === 0) return;
    
    setAttributes([...attributes, {
      name: newAttribute.name,
      values: validValues.map(v => ({
        value: v.value,
        priceAdjustment: parseFloat(v.priceAdjustment) || 0
      }))
    }]);
    
    // Reset new attribute form
    setNewAttribute({
      name: '',
      values: [{ value: '', priceAdjustment: 0 }]
    });
  };

  const removeAttribute = (index) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const addAttributeValue = () => {
    setNewAttribute({
      ...newAttribute,
      values: [...newAttribute.values, { value: '', priceAdjustment: 0 }]
    });
  };

  const removeAttributeValue = (valueIndex) => {
    if (newAttribute.values.length <= 1) return;
    
    setNewAttribute({
      ...newAttribute,
      values: newAttribute.values.filter((_, i) => i !== valueIndex)
    });
  };

  const updateAttributeValue = (valueIndex, field, newValue) => {
    const updatedValues = [...newAttribute.values];
    updatedValues[valueIndex][field] = field === 'priceAdjustment' 
      ? parseFloat(newValue) || 0 
      : newValue;
    
    setNewAttribute({
      ...newAttribute,
      values: updatedValues
    });
  };

  return (
    <div className="flex flex-col justify-start shadow-md bg-white px-4 py-6 rounded-lg">
      <ToastContainer />
      <div className="flex flex-col gap-6">
        
        {/* Image upload section (unchanged) */}
        <div className="flex flex-col gap-2">
          <h3 className='text-lg font-medium'>Upload Images</h3>
          <div className="flex flex-row gap-3 items-center">
            {images.map((img, index) => (
              <label key={index} htmlFor={`image${index + 1}`}>
                <img 
                  src={img ? URL.createObjectURL(img) : assets.upload_area}
                  className={`w-22 rounded-lg ${img ? 'w-33 h-33 object-contain' : ''}`} 
                  alt="" 
                />
                <input
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  type="file"
                  id={`image${index + 1}`}
                  hidden
                />
              </label>
            ))}
          </div>
        </div>

        {/* Basic product info (unchanged) */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-lg font-medium'>Product Name</h3>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder='Product name...'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <h3 className='text-lg font-medium'>Product Description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Product description...'
          />
        </div>

        <div className="flex flex-row items-center justify-between">
          {/* Category and subcategory selects (unchanged) */}
          <div className="flex flex-col gap-2">
            <h3 className='font-medium text-lg'>Base Price</h3>
            <input
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              type="number"
              placeholder='199.99$...'
            />
          </div>
        </div>

        {/* Attributes Section */}
        <div className="flex flex-col gap-4">
          <h3 className='text-lg font-medium'>Product Attributes</h3>
          
          {/* Existing attributes */}
          {attributes.map((attr, attrIndex) => (
            <div key={attrIndex} className="border p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className='font-medium'>{attr.name}</h4>
                <button 
                  onClick={() => removeAttribute(attrIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {attr.values.map((val, valIndex) => (
                  <div key={valIndex} className="bg-gray-100 px-2 py-1 rounded flex items-center gap-1">
                    <span>{val.value}</span>
                    {val.priceAdjustment !== 0 && (
                      <span className="text-sm text-gray-600">
                        ({val.priceAdjustment > 0 ? '+' : ''}{val.priceAdjustment}$)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Add new attribute form */}
          <div className="border p-3 rounded-lg">
            <h4 className='font-medium mb-2'>Add New Attribute</h4>
            
            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                value={newAttribute.name}
                onChange={(e) => setNewAttribute({...newAttribute, name: e.target.value})}
                placeholder="Attribute name (e.g. Color, Size, Volume)"
                className="flex-1"
              />
            </div>
            
            <div className="space-y-2 mb-3">
              {newAttribute.values.map((val, valIndex) => (
                <div key={valIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={val.value}
                    onChange={(e) => updateAttributeValue(valIndex, 'value', e.target.value)}
                    placeholder="Value (e.g. Red, 100ml)"
                    className="flex-1"
                  />
                  <input
                    type="number"
                    value={val.priceAdjustment}
                    onChange={(e) => updateAttributeValue(valIndex, 'priceAdjustment', e.target.value)}
                    placeholder="Price adjustment"
                    className="w-24"
                  />
                  <button
                    onClick={() => removeAttributeValue(valIndex)}
                    className="text-red-500 hover:text-red-700"
                    disabled={newAttribute.values.length <= 1}
                  >
                    <FiX />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={addAttributeValue}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
              >
                <FiPlus size={14} /> Add Value
              </button>
              
              <button
                onClick={addAttribute}
                className="ml-auto bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                disabled={!newAttribute.name.trim() || !newAttribute.values.some(v => v.value.trim())}
              >
                Add Attribute
              </button>
            </div>
          </div>
        </div>

        {/* Best seller checkbox */}
        <div className="flex flex-row gap-2 items-center">
          <input
            checked={bestseller}
            onChange={() => setBestseller(prev => !prev)}
            type="checkbox" 
            id='bestseller' 
          />
          <label htmlFor="bestseller">Mark as Best Seller</label>
        </div>

        {/* Submit button */}
        <button 
          onClick={addProduct}
          className="flex items-center justify-center gap-2 bg-gradient-to-tr from-main to-indigo-600 text-white py-2 rounded-lg hover:scale-[1.01] transition-transform"
        >
          <FiPlus />
          <span>Add Product</span>
        </button>
      </div>
    </div>
  );
};

export default Add;