import React, { useState, useEffect } from 'react';
import styles from '../../styles/works.module.css';
import style from '../../styles/search.module.css';
import Image from 'next/image';
import Cookies from 'js-cookie';

const Works = () => {
  const [works, setWorks] = useState([]);
  const [user, setUser] = useState('');
  const [manager, setManager] = useState(false);
  const [senior_manager, setSeniorManager] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [file, setFile] = useState(null);
  const [similarityScores, setSimilarityScores] = useState({});

  useEffect(() => {
    const token = Cookies.get('userToken');
    setUser(token);
  }, []);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/listwork');
        if (!response.ok) {
          throw new Error('Failed to fetch works');
        }
        const data = await response.json();
        if (data.success) {
          setWorks(data.data.map(work => ({ ...work, expanded: false, editable: false })));
        } else {
          console.error('Failed to fetch works:', data.error);
        }
      } catch (error) {
        console.error('Error fetching works:', error);
      }
    };

    const performAction = async (username, action) => {
      try {
        const response = await fetch('http://localhost:3001/api/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            actionTaken: action,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data.message);
          if (action === 'delete') {
            setSeniorManager(true);
            setManager(true);
          } else {
            setManager(true);
          }
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error('Error performing action:', error);
        console.log('Failed to perform action');
      }
    };

    fetchWorks();
    performAction(user, 'create');
    performAction(user, 'mark_done');
    performAction(user, 'delete');

  }, [user]); // Added user as dependency to re-fetch and perform actions when user changes

  const toggleDetails = (id) => {
    setWorks(prevWorks =>
      prevWorks.map(work =>
        work._id === id ? { ...work, expanded: !work.expanded } : work
      )
    );
  };

  const handleInputChange = (id, field, value) => {
    setWorks(prevWorks =>
      prevWorks.map(work =>
        work._id === id ? { ...work, [field]: value } : work
      )
    );
  };

  const toggleEditable = (id) => {
    setWorks(prevWorks =>
      prevWorks.map(work =>
        work._id === id ? { ...work, editable: !work.editable } : work
      )
    );
  };

  const handleSave = async (id) => {
    const workToSave = works.find(work => work._id === id);
    try {
      const response = await fetch(`http://localhost:3001/api/updateWork/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workToSave),
      });
      const data = await response.json();
      if (data.success) {
        setWorks(prevWorks =>
          prevWorks.map(work =>
            work._id === id ? { ...work, editable: false } : work
          )
        );
        console.log('Work updated successfully');
      } else {
        console.error('Failed to update work:', data.error);
      }
    } catch (error) {
      console.error('Error updating work:', error);
    }
  };

  const handleCheckboxChange = (id, isChecked) => {
    setWorks(prevWorks =>
      prevWorks.map(work =>
        work._id === id ? { ...work, isChecked: isChecked } : work
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/deleteWork/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        setWorks(prevWorks => prevWorks.filter(work => work._id !== id));
        console.log('Work deleted successfully');
      } else {
        console.error('Failed to delete work:', data.error);
      }
    } catch (error) {
      console.error('Error deleting work:', error);
    }
  };

  const filteredWorks = works.filter(work =>
    work.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (id) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', works.find(work => work._id === id).description);

    try {
      const response = await fetch(`http://localhost:5000/process-file`, { // Updated URL
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        console.log('File uploaded successfully');
        alert('File uploaded successfully');
        setSimilarityScores(prevScores => ({ ...prevScores, [id]: data.scores }));
      } else {
        console.error('Failed to upload file:', data.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (works.length === 0) {
    return (
      <>
        <Image
          src="/worker-architecture-svgrepo-com.svg"
          alt="Wait for Admin"
          width={300}
          height={300}
          className={styles.center}
        />
        <div className="flex items-center justify-center">
          <h1 className="text-center text-3xl font-bold text-blue-600">
            No Work Assigned Yet, Contact Your Manager
          </h1>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.h1}>Search Work</h1>
        <input
          className={style.input}
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search works..."
        />
      </div>
      <ul>
        {filteredWorks.map((work) => (
          <li key={work._id} className={styles.workItem}>
            <h2 className={styles.title} onClick={() => toggleDetails(work._id)}>{work.title}</h2>
            {work.expanded && (
              <div>
                <p>Description: <span>{work.editable ? (
                  <input
                    type="text"
                    value={work.description}
                    onChange={(e) => handleInputChange(work._id, 'description', e.target.value)}
                  />
                ) : (
                  <span>{work.description}</span>
                )}</span></p>
                <p>Duration: <span>{work.editable ? (
                  <input
                    type="text"
                    value={work.duration}
                    onChange={(e) => handleInputChange(work._id, 'duration', e.target.value)}
                  />
                ) : (
                  <span>{work.duration}</span>
                )}</span></p>
                <p>Created At: {new Date(work.createdAt).toLocaleString()}</p>
                <p>Updated At: {new Date(work.updatedAt).toLocaleString()}</p>
                <div className={styles.buttons}>
                  {senior_manager && (
                    <button className={styles.btn} onClick={() => handleDelete(work._id)}>Delete</button>
                  )}
                  {work.editable && manager && (
                    <button className={styles.btns} onClick={() => handleSave(work._id)}>Save</button>
                  )}
                  {!work.editable && manager && (
                    <button className={styles.btnu} onClick={() => toggleEditable(work._id)}>Update</button>
                  )}
                </div>
                <div>
                  <input type="file" onChange={handleFileChange} />
                  <button onClick={() => handleFileUpload(work._id)}>Upload</button>
                </div>
                {similarityScores[work._id] && (
                  <div>
                    <h3>Similarity Scores:</h3>
                    <ul>
                      {similarityScores[work._id].map((score, index) => (
                        <li key={index}>Description {index + 1}: {score.toFixed(2)}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Works;
