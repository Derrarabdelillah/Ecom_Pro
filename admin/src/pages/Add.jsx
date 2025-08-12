import { FiEdit, FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import { assets } from '../assets/admin_assets/assets';
import { useParams } from 'react-router-dom';

// Back End Api Url

const Add = ({ token }) => {

  const backendUrl = "https://ecom-pro-0qxb.onrender.com";
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('TopWear');
  const [price, setPrice] = useState('');
  const [bestseller, setBestseller] = useState(false);


  const [attributes, setAttributes] = useState([]);
  const [attrName, setAttrName] = useState('');
  const [attrValue, setAttrValue] = useState('');
  const [attrValues, setAttrValues] = useState([]);

  // Add value to current attribute
  const handleAddValue = () => {
    if (!attrName) return;
    if (attrValue && !attrValues.includes(attrValue)) {
      setAttrValues([...attrValues, attrValue]);
      setAttrValue('');
    }
  };

  // Add attribute with its values
  const handleAddAttribute = () => {
    if (attrName && attrValues.length > 0) {
      setAttributes([...attributes, { name: attrName, values: attrValues }]);
      setAttrName('');
      setAttrValues([]);
    }
  };

  // Remove attribute
  const handleRemoveAttribute = (name) => {
    setAttributes(attributes.filter(attr => attr.name !== name));
  };

  // Remove value from current attribute
  const handleRemoveValue = (value) => {
    setAttrValues(attrValues.filter(v => v !== value));
  };

  const addProduct = async () => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('price', price);
    formData.append('bestseller', bestseller);

    // Append attributes as JSON string
    formData.append('attributes', JSON.stringify(attributes));

    // images
    image1 && formData.append('image1', image1)
    image2 && formData.append('image2', image2)
    image3 && formData.append('image3', image3)
    image4 && formData.append('image4', image4)

    const response = await axios.post(`${backendUrl}/api/product/add`, formData, 
      { 
        headers: {
          Authorization: `Bearer ${token}`
        }
        
      }
    )

    if (response.data.success) {
      toast.success(response.data.message, {
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
      setName('');
      setDescription('');
      setStock('')
      setPrice('');
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);
      setAttributes([]);
      setBestseller(false);

    } else {
      toast.error('Error!', {
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
      })
    };

  }


  return (
    <>
      <div className="flex flex-col justify-start shadow-md bg-white px-4 py-6 rounded-lg">
        <ToastContainer />
        <div className="flex flex-col gap-6">

          <div className="flex flex-col gap-2">
            <h3 className='text-lg font-medium'>Upload Images</h3>
            <div className="flex flex-row gap-3 items-center">
              {/* ...image upload code unchanged... */}
              <label htmlFor="image1">
                <img src={image1
                  ? URL.createObjectURL(image1)
                  : assets.upload_area}
                  className={`w-22 rounded-lg ${image1 ? 'w-33 h-33 object-contain' : ''}`} alt="" />
                <input
                  onChange={(e) => setImage1(e.target.files[0])}
                  type="file"
                  id='image1'
                  className='border border-grayBorder px-4 py-2 w-full rounded-lg outline-none focus:ring-main'
                  hidden
                />
              </label>
              <label htmlFor="image2">
                <img src={image2
                  ? URL.createObjectURL(image2)
                  : assets.upload_area} className={`w-22 rounded-lg ${image2 ? 'w-33 h-33 object-contain' : ''}`} alt="" />
                <input
                  onChange={(e) => setImage2(e.target.files[0])}
                  type="file"
                  id='image2'
                  className='border border-grayBorder px-4 py-2 w-full rounded-lg outline-none focus:ring-main'
                  hidden
                />
              </label>
              <label htmlFor="image3">
                <img src={image3
                  ? URL.createObjectURL(image3)
                  : assets.upload_area} className={`w-22 rounded-lg ${image3 ? 'w-33 h-33 object-contain' : ''}`} alt="" />
                <input
                  onChange={(e) => setImage3(e.target.files[0])}
                  type="file"
                  id='image3'
                  className='border border-grayBorder px-4 py-2 w-full rounded-lg outline-none focus:ring-main'
                  hidden
                />
              </label>
              <label htmlFor="image4">
                <img src={image4
                  ? URL.createObjectURL(image4)
                  : assets.upload_area} className={`w-22 rounded-lg ${image4 ? 'w-33 h-33 object-contain' : ''}`} alt="" />
                <input
                  onChange={(e) => setImage4(e.target.files[0])}
                  type="file"
                  id='image4'
                  className='border border-grayBorder px-4 py-2 w-full rounded-lg outline-none focus:ring-main'
                  hidden
                />
              </label>
            </div>
          </div>

          <div className='flex flex-col gap-2' >
            <h3 className='text-lg font-medium'>Product Name</h3>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder='Your Product Name...'
              className='border border-grayBorder px-4 py-2 rounded-lg focus:ring-main focus:ring-1 outline-none'
            />
          </div>

          <div className='flex flex-col gap-2' >
            <h3 className='text-lg font-medium'>Product Description</h3>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              placeholder='Your Product Description...'
              className='border border-grayBorder px-4 py-2 rounded-lg focus:ring-main focus:ring-1 outline-none h-50 max-h-70 min-h-11'
            />
          </div>

          <div className="flex flex-row items-center justify-between ">
            <div className="flex flex-col gap-2">
              <h3 className='font-medium text-lg'>Product Category</h3>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                name="Categories" className='border border-grayBorder px-4 py-2 rounded-lg outline-none'>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className='font-medium text-lg'>Sub Category</h3>
              <select
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
                name="subCategories" className='border border-grayBorder px-4 py-2 rounded-lg outline-none'>
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className='font-medium text-lg'>Product Price</h3>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="number"
                placeholder='199.99$...'
                className='border border-grayBorder px-4 py-2 rounded-lg focus:ring-main focus:ring-1 outline-none'
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className='font-medium text-lg'>Stock Quantity</h3>
              <input
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                type="number"
                placeholder='100'
                className='border border-grayBorder px-4 py-2 rounded-lg focus:ring-main focus:ring-1 outline-none'
              />
            </div>
          </div>

          {/* Dynamic Attributes Section */}
          <div className="flex flex-col gap-2">
            <h3 className='text-lg font-medium'>Product Attributes</h3>
            <div className="flex flex-row gap-2 mb-2">
              <input
                type="text"
                className="border border-grayBorder px-4 py-2 rounded-lg focus:ring-main focus:ring-1 outline-none"
                placeholder="Attribute name (e.g. colors)"
                value={attrName}
                onChange={e => setAttrName(e.target.value)}
              />
              <input
                type="text"
                className="border border-grayBorder px-4 py-2 rounded-lg focus:ring-main focus:ring-1 outline-none"
                placeholder="Value (e.g. red)"
                value={attrValue}
                onChange={e => setAttrValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddValue())}
              />
              <button
                type="button"
                className="cursor-pointer bg-gray-200 hover:bg-main hover:text-white px-3 py-1 rounded-lg font-medium transition"
                onClick={handleAddValue}
              >
                Add Value
              </button>
            </div>
            <div className="flex flex-row gap-2 mb-2 flex-wrap">
              {attrValues.map((val, idx) => (
                <span key={idx} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg flex items-center gap-1">
                  {val}
                  <button
                    type="button"
                    className="cursor-pointer text-red-500 ml-1 font-bold"
                    onClick={() => handleRemoveValue(val)}
                  >×</button>
                </span>
              ))}
            </div>
            <button
              type="button"
              className="cursor-pointer bg-main text-white px-3 py-1 rounded-lg font-medium w-fit mb-2 hover:bg-indigo-700 transition"
              onClick={handleAddAttribute}
              disabled={!attrName || attrValues.length === 0}
            >
              Add Attribute
            </button>
            {/* List of added attributes */}
            <div className="flex flex-col gap-2">
              {(Array.isArray(attributes) ? attributes : []).map((attr, idx) => (
                <div key={attr.name} className="flex flex-row items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                  <span className="font-semibold capitalize">{attr.name}:</span>
                  <div className="flex flex-row gap-1 flex-wrap">
                    {attr.values.map((v, i) => (
                      <span key={i} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg">{v}</span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="cursor-pointer text-red-500 ml-2 font-bold"
                    onClick={() => handleRemoveAttribute(attr.name)}
                  >Remove</button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <input
              checked={bestseller}
              onChange={() => setBestseller((prev) => !prev)}
              type="checkbox" id='bestseller' className='w-3 h-3' />
            <label htmlFor="bestseller" className=''>Add To Best Seller</label>
          </div>

          <div onClick={addProduct} className={`flex flex-row items-center justify-center font-bold px-4 py-2 cursor-pointer gap-2 bg-gradient-to-tr from-main to-indigo-600 text-white rounded-lg hover:scale-101`} >
            <FiPlus />
            <span>Add Product</span>
          </div>

        </div>
      </div>
    </>
  )
}

export default Add;