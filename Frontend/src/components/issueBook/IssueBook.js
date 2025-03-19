import { useState, useEffect } from "react";
import moment, { months, suppressDeprecationWarnings } from "moment";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header';
import HttpClient from "../../services/issueBook-service";
toast.configure()

const IssueBook = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const retrievedBookId = queryParams.get('id') // Retrieved from previous view book page
    console.log('Issue book id is ', retrievedBookId)
    // bookID will be fetched from URL
    const bookID = retrievedBookId;
    const userEmail = localStorage.getItem("email").substring(1, localStorage.getItem("email").length-1);

    const [book, setBook] = useState(null);
    const [contact, setcontactNumber] = useState(null);

    const fetchBookById = async (id) => {
        const bookResponse = await HttpClient.get(`/getBookByID/${id}`);
        setBook(bookResponse.data.Item);
    };

    const fetchContactNumberByEmail = async (email) => {
        const userResponse = await HttpClient.get(`/getContactNumberByEmail/${userEmail}`);
        console.log(userResponse)
        setcontactNumber(userResponse.data.Item);
    };

    useEffect(() => {
        fetchBookById(bookID);
        fetchContactNumberByEmail(userEmail);
    }, []);

    const bookIssueDate = moment().format("YYYY-MM-DD")
    const bookReturnDate = moment().add(1, 'months').format("YYYY-MM-DD")

    const handleRegister = async (event) => {
        event.preventDefault();
        const issueBookRes = await HttpClient.post("/issueBook", {
            "email": userEmail,
            "booksIssued": [
                {
                    "bookTitle": book.name
                }
            ],
            "contactNumber": contact.contactNumber
        });
        if (issueBookRes.status === 200) {
            toast(issueBookRes.data.message);
        } else {
            toast("Something went wrong.")
        }
    };

    return (
        <div className="container">
            <div className="issue-book">
                <form onSubmit={handleRegister}>
                    <h2 className="title">Issue Book</h2>
                    <div className="ui divider"></div>
                    <div className="ui form"></div>
                    <div className="field">
                        <label>Book Name:</label>
                        <input
                            className={`text-label`}
                            name="bookname"
                            type="text"
                            value={book?.name}
                            disabled={true}
                        ></input>
                    </div>
                    <div className="field">
                        <label>Book Author:</label>
                        <input
                            className={`text-label`}
                            name="bookauthor"
                            type="text"
                            value={book?.author}
                            disabled={true}
                        ></input>
                    </div>
                    <div className="field">
                        <label>Email:</label>
                        <input
                            className={`text-label`}
                            name="email"
                            type="email"
                            value={userEmail}
                            disabled={true}
                        ></input>
                    </div>
                    <div className="field">
                        <label>Contact number:</label>
                        <input
                            className={`text-label`}
                            name="contactNumber"
                            type="tel"
                            value={contact?.contactNumber}
                            disabled={true}
                        ></input>
                    </div>
                    <div className="field">
                        <div className="field1">
                            <label>Issue Date:</label>
                            <input
                                className={`text-label`}
                                name="issuedate"
                                type="date"
                                value={bookIssueDate}
                                disabled={true}
                            ></input>
                        </div>
                        <div className="field2">
                            <label>Return Date:</label>
                            <input
                                className={`text-label`}
                                name="issuedate"
                                type="date"
                                value={bookReturnDate}
                                disabled={true}
                            ></input>
                        </div>
                    </div>
                    <div className="submit-container">
                        <button className="button" >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default IssueBook;