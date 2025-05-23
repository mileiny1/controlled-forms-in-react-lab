import { useState } from 'react';



const Bookshelf = () => {
  //list of books of my favorites books
  const [books, setBooks] = useState([
    { title: 'In the Time of the Butterflies', author: 'Julia Alvarez' },
    { title: 'Cuentos escritos en el exilio', author: 'Juan Bosch' },
    { title: 'cuentos inolvidables', author: 'Juan Bosch' },
    {title: 'Beginning MERN Stack', author: 'Greg Lim'},
  ]);

  // State for the current form input
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  // Handle inputchange 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  // Handlesubmit function
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newBook.title && newBook.author) {
      const updatedBooks = [...books, newBook].sort((a, b) => {
        const aLastName = a.author.split(' ').pop();
        const bLastName = b.author.split(' ').pop();
        if (aLastName !== bLastName) {
          return aLastName.localeCompare(bLastName);
        }
        return a.title.split(' ')[0].localeCompare(b.title.split(' ')[0]);
      });

      setBooks(updatedBooks);
      setNewBook({ title: '', author: '' }); // clear form
    }
  };

  return (
    <div className="bookshelfDiv">
      <div className="formDiv">
        <h3>Add a Book</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={newBook.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={newBook.author}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Book</button>
        </form>
      </div>

      <div className="bookCardsDiv">
        {books.map((book, index) => (
          <div key={index} className="bookCard">
            <h4>{book.title}</h4>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
