import React, { useEffect, useState } from "react";
import axios from "axios";

const EditDelete = ({ id }) => {
  const [formValues, setFormValues] = useState({
    employeeId: "",
    employeeName: "",
    nic: "",
    contactNumber: "",
    category: "",
    region: "",
  });
  const [data, setData] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/employee/${data?._id}`,
        formValues
      );
      console.log('Update Response:', response);
      console.log('Employee updated successfully');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/employee/${id}`);
      console.log('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleShowEdit = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/employee/${id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      setData(response.data);
      setShowUpdateModal(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
      } else {
        console.log("unexpected error: ", error);
      }
    }
  };

  useEffect(() => {
    // Your initialization logic, such as setting up modals
    // Example: initFlowbite();
  }, []);

  return (
    <div>
      <button
        onClick={handleShowEdit}
        type="button"
        className="your-button-style" // Replace with your actual button style class
      >
        Edit
      </button>

      {/* Update Modal */}
      {showUpdateModal && (
        <UpdateEmployeeModal
          data={data}
          formValues={formValues}
          setFormValues={setFormValues}
          handleUpdate={handleUpdate}
          closeUpdateModal={() => setShowUpdateModal(false)}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteEmployeeModal
          handleDelete={handleDelete}
          closeDeleteModal={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

const UpdateEmployeeModal = ({
  data,
  formValues,
  setFormValues,
  handleUpdate,
  closeUpdateModal,
}) => {
  return (
    <div>
      {/* Your update employee modal content */}
      <form onSubmit={handleUpdate}>
        {/* Input fields for updating */}
        {/* You can use the code you had for input fields */}
        {/* Example: */}
        <input
          type="text"
          defaultValue={data?.employeeId}
          onChange={(e) =>
            setFormValues({ ...formValues, employeeId: e.target.value })
          }
          name="employeeId"
          // ... (other attributes and styles)
        />

        {/* ... Add other input fields similarly ... */}

        <button type="submit">Update Employee</button>
        <button onClick={closeUpdateModal} type="button">
          Cancel
        </button>
      </form>
    </div>
  );
};

const DeleteEmployeeModal = ({ handleDelete, closeDeleteModal }) => {
  return (
    <div>
      {/* Your delete employee modal content */}
      <p>Are you sure you want to delete this Employee?</p>
      <button onClick={handleDelete} type="button">
        Yes, I'm sure
      </button>
      <button onClick={closeDeleteModal} type="button">
        No, cancel
      </button>
    </div>
  );
};

export default EditDelete;
