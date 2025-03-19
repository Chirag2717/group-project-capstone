
import { useState, useEffect } from "react"
import { API } from '../components/API';
import { Card, Container, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const axios = require('axios')

const ViewBooks = () => {

    const navigate = useNavigate()

    const [books, setBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])

    const [search, setSearch] = useState("")
    const handleSearch = (event) => {
        setFilteredBooks(books)
        const searchQuery = event.target.value
        setSearch(searchQuery)
        if (searchQuery !== "") {
            const searchBooks = books.filter(book => {
                return book.name.toLowerCase().search(searchQuery.toLowerCase()) !== -1 || book.author.toLowerCase().search(searchQuery.toLowerCase()) !== -1;
            });
            setFilteredBooks(searchBooks)
        }

    }



    useEffect(() => {
        retrieveBackEndResponse().then(resp => {
            setBooks(resp.data)
            setFilteredBooks(resp.data)
            console.log('Data', resp)
        })
    }, []
    );


    const retrieveBackEndResponse = async () => {
        try {
            const resp = await axios.get(`${API}/viewBooks`);
            return resp
        } catch (err) {
            console.error(err);
            return "Something failed"
        }
    }

    const handleBookCheckout = (event) => {
        navigate(`/issuebook?id=${event.target.id}`)
    }

    return (
        <div className="mb-5 mt-5">
            <Container fluid="sm" className="mb-5 mt-5">
                <label className="text-center">Search by firstName or LastName:
                    <input type="text" value={search} onChange={handleSearch} />
                </label>
                {filteredBooks.map(book => (
                    <Row className="justify-content-center">
                        <div className="h-100 d-inline-block mb-5" style={{ width: '20%' }}>
                            <Card key={book.id} >
                                <Card.Img variant="top" src={book.image} height='10%' width='10%' />
                                <Card.Body>
                                    <Card.Title>{book.name}</Card.Title>
                                    <Card.Text>Authors- {book.author}</Card.Text>
                                    <Button id={book.id} onClick={handleBookCheckout}>Checkout Book</Button>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Available quantity - {book.availableQuantity}</small>
                                </Card.Footer>
                            </Card>
                        </div>
                    </Row>
                ))}
            </Container>
        </div>
    )
}


export default ViewBooks