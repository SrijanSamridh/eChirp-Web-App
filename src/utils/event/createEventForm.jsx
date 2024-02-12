import React, { useState } from "react";

import Event from "../../pages/events/services/events.services";
import "./style.css";

function CreateEventForm() {
  const [formData, setFormData] = useState({
    mainCategory: "",
    subCategory: "",
    subSubCategory: " ",
    dateOfEvent: "",
    startTime: "",
    endTime: "",
    location: "",
    nameOfPlace: "",
    address: "",
    maxParticipants: 20,
    eventTitle: "",
    eventDescription: "",
    coverImgUrl: "https://img.freepik.com/free-photo/happy-excited-friends-reunited_23-2149165087.jpg?size=626&ext=jpg&ga=GA1.1.119236241.1707224145&semt=country_rows_v1",
    Img1Url: "https://example.com/image1.jpg",
    Img2Url: "https://example.com/image2.jpg",
    Img3Url: "https://example.com/image3.jpg",
    Img4Url: "https://example.com/image4.jpg",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve user ID from the localStorage
      const createdBy = localStorage.getItem("userId");

      // Add createdBy field to formData
      const formDataWithCreatedBy = {
        ...formData,
        createdBy: createdBy,
      };

      // Call the postRequest function from the Event service
      const success = await Event.postRequest(formDataWithCreatedBy);
      if (success) {
        // Redirect to home page on successful submission
        window.location.href = "/";
      } else {
        alert("Form did not submit due to an error.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Form did not submit due to an error.");
    }
  };

  return (
    <div>
      <div className="main-container">
        <div className="form">
          <h3>Create Event</h3>
          <div className="form-inner">
            <form onSubmit={handleSubmit}>
              <div className="fields-container">
                <div>
                  {/* Inputs for Selecting category */}
                  <div>
                    <label>
                      Main Category:
                      <input
                        type="text"
                        name="mainCategory"
                        value={formData.mainCategory}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Sub Category:
                      <input
                        type="text"
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Sub Sub Category:
                      <input
                        type="text"
                        name="subSubCategory"
                        value={formData.subSubCategory}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>

                {/* Inputs for Event Information */}
                <div className="fields-container">
                  <div>
                    <label>
                      Event Title:
                      <input
                        type="text"
                        name="eventTitle"
                        value={formData.eventTitle}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Name of Place:
                      <input
                        type="text"
                        name="nameOfPlace"
                        value={formData.nameOfPlace}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Max Participants:
                      <input
                        type="number"
                        name="maxParticipants"
                        value={formData.maxParticipants}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Event Description:
                      <textarea
                        name="eventDescription"
                        value={formData.eventDescription}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div>
                {/* Inputs for Upload */}
                <div>
                  <label>
                    Cover Image:
                    <input
                      type="file"
                      accept="image/*"
                      name="coverImgFile"
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Image 1:
                    <input
                      type="file"
                      accept="image/*"
                      name="Img1File"
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Image 2:
                    <input
                      type="file"
                      accept="image/*"
                      name="Img2File"
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Image 3:
                    <input
                      type="file"
                      accept="image/*"
                      name="Img3File"
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Image 4:
                    <input
                      type="file"
                      accept="image/*"
                      name="Img4File"
                      onChange={handleChange}
                    />
                  </label>
                </div>

                {/* Inputs for Event Specifications */}
                <div className="fields-container">
                  <div>
                    <label>
                      Address:
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Location:
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Date:
                      <input
                        type="date"
                        name="dateOfEvent"
                        value={formData.dateOfEvent}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      Start Time:
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      End Time:
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <button type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEventForm;
