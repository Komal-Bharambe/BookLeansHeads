import { Modal, Table, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetIssues } from "../../../apicalls/issues";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import moment from "moment";
import Button from "../../../components/Button";

function IssuesBooks() {
    const {user} = useSelector((state) => state.users)
    const [issuedBooks, setIssuedBooks] = React.useState([]);

    const dispatch = useDispatch();

    const getIssues = async() =>{
      try {
        dispatch(ShowLoading());
        const response = await GetIssues({
           user: user._id,
        });
        dispatch(HideLoading());
        if(response.success){
          setIssuedBooks(response.data);
        }
      } catch (error) {
        dispatch(HideLoading())
        message.error(error.message)
      }
    }
  
    useEffect(() =>{
      getIssues()
    }, []);

    
  const columns = [
    {
      title: "id",
      dataIndex: "_id",
    },
    {
      title: "Book",
      dataIndex: "book",
      render: (book) => book.title,
    },
    // {
    //   title: "Title",
    //   dataIndex: "book",
    //   render: (book) => book.title
    //  },
    {
      title: "Issues On",
      dataIndex: "issueDate",
      render: (issueDate) => moment(issueDate).format("DD-MM-YYYY hh:mm:ss A"),

    },
    {
      title: "Return Date (Due Date)",
      dataIndex: "returnDate",
      render: (dueDate) => moment(dueDate).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Rent",
      dataIndex: "rent"
    },
    {
      title: "Fine",
      dataIndex: "fine"
    },
    {
      title: "Returned On",
      dataIndex: "returnedDate",
      render: (returnedDate) => {
        if(returnedDate){
          return moment(returnedDate).format("DD-MM-YYYY hh:mm A");

        }
        else{
          return "Not Returned Yet";
        }
      }
    }
    
  ]
  return (
    // <div>IssuesBooks</div>
   

        
        <Table columns={columns} dataSource={issuedBooks}/>
   
  );
}

export default IssuesBooks;