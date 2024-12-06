"use client";

import useCourseStore from "@/store/useCourseStore";
import React, { useState } from "react";

const AddCourse = () => {
  const { addNewCourse, fetchCourses, loading, error } = useCourseStore();
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    thumbnail: null as File | null, // Adjust type
    price: 0,
    category: "",
    subject: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newCourse.title);
    formData.append("description", newCourse.description);
    if (newCourse.thumbnail) {
      formData.append("thumbnail", newCourse.thumbnail); // Add file
    }
    formData.append("price", newCourse.price.toString());
    formData.append("category", newCourse.category);
    formData.append("subject", newCourse.subject);

    await addNewCourse(formData); // Pass FormData
    alert("Course added successfully!");
    setNewCourse({
      title: "",
      description: "",
      thumbnail: null, // Reset to null
      price: 0,
      category: "",
      subject: "",
    });

    // Clear the file input element
    const fileInput = document.querySelector(
      'input[name="thumbnail"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // Clear the file input value
    }

    await fetchCourses();
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <h1>Add New Course</h1>
      <label>
        Title:
        <input
          type="text"
          placeholder="Enter course title"
          value={newCourse.title}
          onChange={(e) =>
            setNewCourse({ ...newCourse, title: e.target.value })
          }
          required
        />
      </label>

      <label>
        Description:
        <textarea
          placeholder="Enter course description"
          value={newCourse.description}
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
          required
          rows={4}
        />
      </label>

      <label>
        Thumbnail:
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setNewCourse({ ...newCourse, thumbnail: e.target.files[0] }); // Assign File
            }
          }}
          required
        />
      </label>

      <label>
        Price:
        <input
          type="number"
          placeholder="Enter course price"
          value={newCourse.price}
          onChange={(e) =>
            setNewCourse({
              ...newCourse,
              price: parseFloat(e.target.value) || 0,
            })
          }
          required
        />
      </label>

      <label>
        Category:
        <input
          type="text"
          placeholder="Enter category"
          value={newCourse.category}
          onChange={(e) =>
            setNewCourse({ ...newCourse, category: e.target.value })
          }
          required
        />
      </label>

      <label>
        Subject:
        <input
          type="text"
          placeholder="Enter subject"
          value={newCourse.subject}
          onChange={(e) =>
            setNewCourse({ ...newCourse, subject: e.target.value })
          }
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Course"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddCourse;
