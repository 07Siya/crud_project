// import React, { useState, useEffect } from 'react';
// import { Plus, Edit, Trash2, Search, BookOpen, User, Calendar, DollarSign, CheckCircle, XCircle } from 'lucide-react';

// const App = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [editingBook, setEditingBook] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     authors: '',
//     ISBN: '',
//     category: '',
//     language: '',
//     condition: '',
//     description: '',
//     coverImageUrl: '',
//     donationValue: '',
//     available: true
//   });

//   // Initialize with sample data
//   useEffect(() => {
//     const initialBooks = [
//       {
//         "_id": "681f14add5fad2624bdbb8dc",
//         "title": "The Great Gatsby",
//         "authors": ["F. Scott Fitzgerald"],
//         "ISBN": "9780743273565",
//         "category": "Classic Literature",
//         "language": "English",
//         "condition": "Good",
//         "description": "A timeless classic exploring themes of wealth and identity in the Jazz Age.",
//         "coverImageUrl": "https://res.cloudinary.com/grossifyindia/image/upload/v1746867372/uploads/msnnlrrkmoazsyliur8i.jpg",
//         "ownerId": {
//           "_id": "681ee16348effc430b499807",
//           "name": "John Doe",
//           "email": "john@example.com",
//           "phone": "1234567890",
//           "city": "Mumbai",
//           "isPrime": false
//         },
//         "ownerPincode": "560001",
//         "available": true,
//         "donationValue": 100,
//         "createdAt": "2025-05-10T08:56:13.261Z"
//       },
//       {
//         "_id": "682f6f9a6b98f4cccaacdd8a",
//         "title": "The Art of Testing",
//         "authors": ["Software Testing Expert"],
//         "ISBN": "9781234567890",
//         "category": "Technology",
//         "language": "English",
//         "condition": "Excellent",
//         "description": "A comprehensive guide to modern software testing strategies and best practices.",
//         "coverImageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
//         "ownerId": {
//           "_id": "681ee16348effc430b499807",
//           "name": "John Doe",
//           "email": "john@example.com",
//           "phone": "1234567890",
//           "city": "Mumbai",
//           "isPrime": false
//         },
//         "ownerPincode": "560001",
//         "available": true,
//         "donationValue": 150,
//         "createdAt": "2025-05-22T18:40:26.907Z"
//       }
//     ];
    
//     setBooks(initialBooks);
//     setFilteredBooks(initialBooks);
//   }, []);

//   // Search functionality
//   useEffect(() => {
//     const filtered = books.filter(book =>
//       book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       book.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       book.category.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredBooks(filtered);
//   }, [searchTerm, books]);

//   const resetForm = () => {
//     setFormData({
//       title: '',
//       authors: '',
//       ISBN: '',
//       category: '',
//       language: '',
//       condition: '',
//       description: '',
//       coverImageUrl: '',
//       donationValue: '',
//       available: true
//     });
//     setEditingBook(null);
//   };

//   const handleCreate = () => {
//     setShowModal(true);
//     resetForm();
//   };

//   const handleEdit = (book) => {
//     setEditingBook(book);
//     setFormData({
//       title: book.title,
//       authors: Array.isArray(book.authors) ? book.authors.join(', ') : book.authors,
//       ISBN: book.ISBN,
//       category: book.category,
//       language: book.language,
//       condition: book.condition,
//       description: book.description,
//       coverImageUrl: book.coverImageUrl,
//       donationValue: book.donationValue,
//       available: book.available
//     });
//     setShowModal(true);
//   };

//   const handleDelete = (bookId) => {
//     if (window.confirm('Are you sure you want to delete this book?')) {
//       setBooks(books.filter(book => book._id !== bookId));
//     }
//   };

//   const handleSubmit = () => {
    
//     const bookData = {
//       ...formData,
//       authors: formData.authors.split(',').map(author => author.trim()),
//       donationValue: parseInt(formData.donationValue) || 0,
//       ownerId: {
//         "_id": "681ee16348effc430b499807",
//         "name": "John Doe",
//         "email": "john@example.com",
//         "phone": "1234567890",
//         "city": "Mumbai",
//         "isPrime": false
//       },
//       ownerPincode: "560001",
//       createdAt: new Date().toISOString()
//     };

//     if (editingBook) {
//       // Update existing book
//       setBooks(books.map(book => 
//         book._id === editingBook._id 
//           ? { ...book, ...bookData, updatedAt: new Date().toISOString() }
//           : book
//       ));
//     } else {
//       // Create new book
//       const newBook = {
//         ...bookData,
//         _id: Date.now().toString(),
//       };
//       setBooks([...books, newBook]);
//     }

//     setShowModal(false);
//     resetForm();
//   };

//   const toggleAvailability = (bookId) => {
//     setBooks(books.map(book =>
//       book._id === bookId
//         ? { ...book, available: !book.available, updatedAt: new Date().toISOString() }
//         : book
//     ));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
//             <BookOpen className="text-purple-600" size={40} />
//             Book Management System
//           </h1>
//           <p className="text-gray-600">Manage your book collection with ease</p>
//         </div>

//         {/* Controls */}
//         <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search books, authors, or categories..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
//             />
//           </div>
//           <button
//             onClick={handleCreate}
//             className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//           >
//             <Plus size={20} />
//             Add New Book
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">Total Books</p>
//                 <p className="text-2xl font-bold text-gray-800">{books.length}</p>
//               </div>
//               <BookOpen className="text-purple-500" size={32} />
//             </div>
//           </div>
//           <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">Available</p>
//                 <p className="text-2xl font-bold text-green-600">{books.filter(b => b.available).length}</p>
//               </div>
//               <CheckCircle className="text-green-500" size={32} />
//             </div>
//           </div>
//           <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-500 text-sm">Total Value</p>
//                 <p className="text-2xl font-bold text-blue-600">₹{books.reduce((sum, book) => sum + (book.donationValue || 0), 0)}</p>
//               </div>
//               <DollarSign className="text-blue-500" size={32} />
//             </div>
//           </div>
//         </div>

//         {/* Books Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredBooks.map((book) => (
//             <div key={book._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
//               {/* Book Cover */}
//               <div className="relative h-48 bg-gradient-to-br from-purple-100 to-blue-100">
//                 {book.coverImageUrl ? (
//                   <img
//                     src={book.coverImageUrl}
//                     alt={book.title}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.style.display = 'none';
//                       e.target.nextSibling.style.display = 'flex';
//                     }}
//                   />
//                 ) : null}
//                 <div className="absolute inset-0 flex items-center justify-center text-gray-400" style={{ display: book.coverImageUrl ? 'none' : 'flex' }}>
//                   <BookOpen size={48} />
//                 </div>
                
//                 {/* Availability Badge */}
//                 <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
//                   book.available 
//                     ? 'bg-green-100 text-green-800' 
//                     : 'bg-red-100 text-red-800'
//                 }`}>
//                   {book.available ? 'Available' : 'Not Available'}
//                 </div>
//               </div>

//               <div className="p-6">
//                 {/* Title and Category */}
//                 <div className="mb-3">
//                   <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">{book.title}</h3>
//                   <p className="text-purple-600 text-sm font-medium">{book.category}</p>
//                 </div>

//                 {/* Authors */}
//                 <div className="mb-3">
//                   <p className="text-gray-600 text-sm flex items-center gap-1">
//                     <User size={14} />
//                     {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors || 'Unknown Author'}
//                   </p>
//                 </div>

//                 {/* Description */}
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-3">{book.description}</p>

//                 {/* Book Details */}
//                 <div className="space-y-2 mb-4 text-sm">
//                   {book.ISBN && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-500">ISBN:</span>
//                       <span className="text-gray-700">{book.ISBN}</span>
//                     </div>
//                   )}
//                   {book.language && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-500">Language:</span>
//                       <span className="text-gray-700">{book.language}</span>
//                     </div>
//                   )}
//                   {book.condition && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-500">Condition:</span>
//                       <span className="text-gray-700">{book.condition}</span>
//                     </div>
//                   )}
//                   {book.donationValue && (
//                     <div className="flex justify-between">
//                       <span className="text-gray-500">Value:</span>
//                       <span className="text-blue-600 font-medium">₹{book.donationValue}</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Owner Info */}
//                 <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//                   <p className="text-xs text-gray-500 mb-1">Owner</p>
//                   <p className="text-sm font-medium text-gray-700">{book.ownerId?.name}</p>
//                   <p className="text-xs text-gray-500">{book.ownerId?.city}</p>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => toggleAvailability(book._id)}
//                     className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
//                       book.available
//                         ? 'bg-red-100 text-red-700 hover:bg-red-200'
//                         : 'bg-green-100 text-green-700 hover:bg-green-200'
//                     }`}
//                   >
//                     {book.available ? <XCircle size={16} className="inline mr-1" /> : <CheckCircle size={16} className="inline mr-1" />}
//                     {book.available ? 'Mark Unavailable' : 'Mark Available'}
//                   </button>
//                   <button
//                     onClick={() => handleEdit(book)}
//                     className="bg-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-200 transition-colors"
//                   >
//                     <Edit size={16} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(book._id)}
//                     className="bg-red-100 text-red-700 p-2 rounded-lg hover:bg-red-200 transition-colors"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredBooks.length === 0 && (
//           <div className="text-center py-12">
//             <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
//             <h3 className="text-xl font-medium text-gray-500 mb-2">No books found</h3>
//             <p className="text-gray-400">Try adjusting your search or add a new book</p>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                 {editingBook ? 'Edit Book' : 'Add New Book'}
//               </h2>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.title}
//                     onChange={(e) => setFormData({...formData, title: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Authors (comma-separated)</label>
//                   <input
//                     type="text"
//                     value={formData.authors}
//                     onChange={(e) => setFormData({...formData, authors: e.target.value})}
//                     placeholder="e.g., F. Scott Fitzgerald, Another Author"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
//                     <input
//                       type="text"
//                       value={formData.ISBN}
//                       onChange={(e) => setFormData({...formData, ISBN: e.target.value})}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
//                     <input
//                       type="text"
//                       value={formData.language}
//                       onChange={(e) => setFormData({...formData, language: e.target.value})}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                     <input
//                       type="text"
//                       value={formData.category}
//                       onChange={(e) => setFormData({...formData, category: e.target.value})}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
//                     <select
//                       value={formData.condition}
//                       onChange={(e) => setFormData({...formData, condition: e.target.value})}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     >
//                       <option value="">Select condition</option>
//                       <option value="Excellent">Excellent</option>
//                       <option value="Good">Good</option>
//                       <option value="Fair">Fair</option>
//                       <option value="Poor">Poor</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => setFormData({...formData, description: e.target.value})}
//                     rows="3"
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
//                   <input
//                     type="url"
//                     value={formData.coverImageUrl}
//                     onChange={(e) => setFormData({...formData, coverImageUrl: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Donation Value (₹)</label>
//                   <input
//                     type="number"
//                     value={formData.donationValue}
//                     onChange={(e) => setFormData({...formData, donationValue: e.target.value})}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     id="available"
//                     checked={formData.available}
//                     onChange={(e) => setFormData({...formData, available: e.target.checked})}
//                     className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
//                   />
//                   <label htmlFor="available" className="ml-2 text-sm text-gray-700">Available for borrowing</label>
//                 </div>

//                 <div className="flex gap-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleSubmit}
//                     className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
//                   >
//                     {editingBook ? 'Update Book' : 'Add Book'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;



import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, BookOpen, User, Calendar, DollarSign, CheckCircle, XCircle, Star, Heart, Eye } from 'lucide-react';

const App = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    ISBN: '',
    category: '',
    language: '',
    condition: '',
    description: '',
    coverImageUrl: '',
    donationValue: '',
    available: true
  });

  // Initialize with sample data
  useEffect(() => {
    const initialBooks = [
      {
        "_id": "681f14add5fad2624bdbb8dc",
        "title": "The Great Gatsby",
        "authors": ["F. Scott Fitzgerald"],
        "ISBN": "9780743273565",
        "category": "Classic Literature",
        "language": "English",
        "condition": "Good",
        "description": "A timeless classic exploring themes of wealth and identity in the Jazz Age.",
        "coverImageUrl": "https://res.cloudinary.com/grossifyindia/image/upload/v1746867372/uploads/msnnlrrkmoazsyliur8i.jpg",
        "ownerId": {
          "_id": "681ee16348effc430b499807",
          "name": "John Doe",
          "email": "john@example.com",
          "phone": "1234567890",
          "city": "Mumbai",
          "isPrime": false
        },
        "ownerPincode": "560001",
        "available": true,
        "donationValue": 100,
        "createdAt": "2025-05-10T08:56:13.261Z",
        "rating": 4.5,
        "favorites": 24
      },
      {
        "_id": "682f6f9a6b98f4cccaacdd8a",
        "title": "The Art of Testing",
        "authors": ["Software Testing Expert"],
        "ISBN": "9781234567890",
        "category": "Technology",
        "language": "English",
        "condition": "Excellent",
        "description": "A comprehensive guide to modern software testing strategies and best practices.",
        "coverImageUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
        "ownerId": {
          "_id": "681ee16348effc430b499807",
          "name": "John Doe",
          "email": "john@example.com",
          "phone": "1234567890",
          "city": "Mumbai",
          "isPrime": false
        },
        "ownerPincode": "560001",
        "available": true,
        "donationValue": 150,
        "createdAt": "2025-05-22T18:40:26.907Z",
        "rating": 4.8,
        "favorites": 12
      },
      {
        "_id": "683a1b2c3d4e5f6g7h8i9j0k",
        "title": "Design Patterns",
        "authors": ["Gang of Four"],
        "ISBN": "9780201633610",
        "category": "Technology",
        "language": "English",
        "condition": "Good",
        "description": "Elements of Reusable Object-Oriented Software - The definitive guide to design patterns.",
        "coverImageUrl": "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop",
        "ownerId": {
          "_id": "681ee16348effc430b499807",
          "name": "Jane Smith",
          "email": "jane@example.com",
          "phone": "9876543210",
          "city": "Delhi",
          "isPrime": true
        },
        "ownerPincode": "110001",
        "available": false,
        "donationValue": 200,
        "createdAt": "2025-05-15T14:30:00.000Z",
        "rating": 4.7,
        "favorites": 35
      }
    ];
    
    setBooks(initialBooks);
    setFilteredBooks(initialBooks);
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(books.map(book => book.category))];

  // Search and filter functionality
  useEffect(() => {
    let filtered = books;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredBooks(filtered);
  }, [searchTerm, selectedCategory, books]);

  const resetForm = () => {
    setFormData({
      title: '',
      authors: '',
      ISBN: '',
      category: '',
      language: '',
      condition: '',
      description: '',
      coverImageUrl: '',
      donationValue: '',
      available: true
    });
    setEditingBook(null);
  };

  const handleCreate = () => {
    setShowModal(true);
    resetForm();
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      authors: Array.isArray(book.authors) ? book.authors.join(', ') : book.authors,
      ISBN: book.ISBN,
      category: book.category,
      language: book.language,
      condition: book.condition,
      description: book.description,
      coverImageUrl: book.coverImageUrl,
      donationValue: book.donationValue,
      available: book.available
    });
    setShowModal(true);
  };

  const handleDelete = (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter(book => book._id !== bookId));
    }
  };

  const handleSubmit = () => {
    const bookData = {
      ...formData,
      authors: formData.authors.split(',').map(author => author.trim()),
      donationValue: parseInt(formData.donationValue) || 0,
      ownerId: {
        "_id": "681ee16348effc430b499807",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "city": "Mumbai",
        "isPrime": false
      },
      ownerPincode: "560001",
      createdAt: new Date().toISOString(),
      rating: 0,
      favorites: 0
    };

    if (editingBook) {
      setBooks(books.map(book => 
        book._id === editingBook._id 
          ? { ...book, ...bookData, updatedAt: new Date().toISOString() }
          : book
      ));
    } else {
      const newBook = {
        ...bookData,
        _id: Date.now().toString(),
      };
      setBooks([...books, newBook]);
    }

    setShowModal(false);
    resetForm();
  };

  const toggleAvailability = (bookId) => {
    setBooks(books.map(book =>
      book._id === bookId
        ? { ...book, available: !book.available, updatedAt: new Date().toISOString() }
        : book
    ));
  };

  const toggleFavorite = (bookId) => {
    setBooks(books.map(book =>
      book._id === bookId
        ? { ...book, favorites: (book.favorites || 0) + 1 }
        : book
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl">
                <BookOpen className="text-white" size={32} />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                BookVault
              </h1>
            </div>
            <p className="text-slate-400 text-lg">Discover, Manage, and Share Your Literary Universe</p>
          </div>

          {/* Controls */}
          <div className="mb-8 flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl w-full">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search your literary collection..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400 shadow-xl"
                />
              </div>
              
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white shadow-xl"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-slate-800 text-white">
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleCreate}
              className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center gap-3 shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 hover:scale-105"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              Add New Book
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Total Books</p>
                  <p className="text-3xl font-bold text-white">{books.length}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="text-white" size={24} />
                </div>
              </div>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Available</p>
                  <p className="text-3xl font-bold text-emerald-400">{books.filter(b => b.available).length}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="text-white" size={24} />
                </div>
              </div>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Total Value</p>
                  <p className="text-3xl font-bold text-yellow-400">₹{books.reduce((sum, book) => sum + (book.donationValue || 0), 0)}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="text-white" size={24} />
                </div>
              </div>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Favorites</p>
                  <p className="text-3xl font-bold text-pink-400">{books.reduce((sum, book) => sum + (book.favorites || 0), 0)}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Heart className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <div key={book._id} className="group bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-white/20 overflow-hidden hover:scale-105 hover:bg-white/15">
                {/* Enhanced Book Cover */}
                <div className="relative h-56 overflow-hidden">
                  {book.coverImageUrl ? (
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-gradient-to-br from-purple-900/50 to-blue-900/50" style={{ display: book.coverImageUrl ? 'none' : 'flex' }}>
                    <BookOpen size={48} />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Enhanced Badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                      book.available 
                        ? 'bg-emerald-500/90 text-white' 
                        : 'bg-red-500/90 text-white'
                    } shadow-lg`}>
                      {book.available ? 'Available' : 'Not Available'}
                    </div>
                    {book.ownerId?.isPrime && (
                      <div className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                        PRIME
                      </div>
                    )}
                  </div>

                  {/* Rating and Favorites */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-4">
                    {book.rating && (
                      <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg">
                        <Star className="text-yellow-400 fill-current" size={14} />
                        <span className="text-white text-sm font-medium">{book.rating}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg">
                      <Heart className="text-pink-400" size={14} />
                      <span className="text-white text-sm font-medium">{book.favorites || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Title and Category */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-200 transition-colors duration-300">{book.title}</h3>
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-bold rounded-full">
                      {book.category}
                    </span>
                  </div>

                  {/* Authors */}
                  <div className="mb-4">
                    <p className="text-slate-300 text-sm flex items-center gap-2">
                      <User size={14} className="text-slate-400" />
                      {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors || 'Unknown Author'}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">{book.description}</p>

                  {/* Enhanced Book Details */}
                  <div className="space-y-2 mb-6 text-sm">
                    {book.condition && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Condition:</span>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          book.condition === 'Excellent' ? 'bg-emerald-500/20 text-emerald-400' :
                          book.condition === 'Good' ? 'bg-blue-500/20 text-blue-400' :
                          book.condition === 'Fair' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {book.condition}
                        </span>
                      </div>
                    )}
                    {book.donationValue && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Value:</span>
                        <span className="text-yellow-400 font-bold">₹{book.donationValue}</span>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Owner Info */}
                  <div className="mb-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Owner</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">{book.ownerId?.name}</p>
                        <p className="text-xs text-slate-400">{book.ownerId?.city}</p>
                      </div>
                      {book.ownerId?.isPrime && (
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Star className="text-white" size={14} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFavorite(book._id)}
                      className="p-3 bg-gradient-to-r from-pink-500/20 to-red-500/20 text-pink-400 rounded-xl hover:from-pink-500/30 hover:to-red-500/30 transition-all duration-300 hover:scale-110"
                    >
                      <Heart size={16} />
                    </button>
                    <button
                      onClick={() => toggleAvailability(book._id)}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                        book.available
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30'
                      }`}
                    >
                      {book.available ? <XCircle size={16} className="inline mr-2" /> : <CheckCircle size={16} className="inline mr-2" />}
                      {book.available ? 'Mark Unavailable' : 'Mark Available'}
                    </button>
                    <button
                      onClick={() => handleEdit(book)}
                      className="p-3 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all duration-300 hover:scale-110 border border-blue-500/30"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="p-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all duration-300 hover:scale-110 border border-red-500/30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-20">
              <div className="mb-6">
                <BookOpen size={80} className="mx-auto text-slate-600 mb-4" />
                <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-6"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No books found</h3>
              <p className="text-slate-400 text-lg mb-8">Your literary journey awaits - add your first book or adjust your search</p>
              <button
                onClick={handleCreate}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1"
              >
                <Plus size={20} className="inline mr-2" />
                Add Your First Book
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl">
                    <BookOpen className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {editingBook ? 'Edit Book' : 'Add New Book'}
                  </h2>
                </div>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400"
                    placeholder="Enter book title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Authors (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.authors}
                    onChange={(e) => setFormData({...formData, authors: e.target.value})}
                    placeholder="e.g., F. Scott Fitzgerald, Another Author"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">ISBN</label>
                    <input
                      type="text"
                      value={formData.ISBN}
                      onChange={(e) => setFormData({...formData, ISBN: e.target.value})}
                      className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400"
                      placeholder="ISBN number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Language</label>
                    <input
                      type="text"
                      value={formData.language}
                      onChange={(e) => setFormData({...formData, language: e.target.value})}
                      className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400"
                      placeholder="e.g., English"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400"
                      placeholder="e.g., Fiction"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Condition</label>
                    <select
                      value={formData.condition}
                      onChange={(e) => setFormData({...formData, condition: e.target.value})}
                      className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                    >
                      <option value="" className="bg-slate-800">Select condition</option>
                      <option value="Excellent" className="bg-slate-800">Excellent</option>
                      <option value="Good" className="bg-slate-800">Good</option>
                      <option value="Fair" className="bg-slate-800">Fair</option>
                      <option value="Poor" className="bg-slate-800">Poor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="3"
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400 resize-none"
                    placeholder="Brief description of the book..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Cover Image URL</label>
                  <input
                    type="url"
                    value={formData.coverImageUrl}
                    onChange={(e) => setFormData({...formData, coverImageUrl: e.target.value})}
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400"
                    placeholder="https://example.com/cover.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Donation Value (₹)</label>
                  <input
                    type="number"
                    value={formData.donationValue}
                    onChange={(e) => setFormData({...formData, donationValue: e.target.value})}
                    className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-slate-400"
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <input
                    type="checkbox"
                    id="available"
                    checked={formData.available}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 bg-white/20 border-white/30"
                  />
                  <label htmlFor="available" className="ml-3 text-sm text-slate-300 flex items-center gap-2">
                    <CheckCircle size={16} className="text-emerald-400" />
                    Available for borrowing
                  </label>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-4 px-6 bg-white/10 backdrop-blur-sm border border-white/20 text-slate-300 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-medium transform hover:scale-105"
                  >
                    {editingBook ? 'Update Book' : 'Add Book'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;