'use client';
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
        <h1 className={styles.h}>List of Work Here</h1>
        <div className={style.searchBar}>
          <input type="text" placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)} className={style.input} />
          <button className={style.button}>🔍</button>
        </div>
      </div>
      <ul className={styles.container}>
        {filteredWorks.map((work) => (
          <li key={work._id} className={styles.workItem}>
            <div className={styles.titleRow} onClick={() => toggleDetails(work._id)}>
              <h2>
                {work.editable ? (
                  <input
                    type="text"
                    value={work.title}
                    onChange={(e) => handleInputChange(work._id, 'title', e.target.value)}
                  />
                ) : (
                  <p>{work.title}</p>
                )}
              </h2>
              {manager && work.editable && (
                <div>
                  <span className={styles.status}>Status:</span>
                  <input
                    type="checkbox"
                    checked={work.isChecked || false}
                    onChange={(e) => handleCheckboxChange(work._id, e.target.checked)}
                    className={styles.checkbox}
                  />
                </div>
              )}
            </div>
            {work.expanded && (
              <div className={styles.details}>
                <h3><u>Description:</u></h3>
                {work.editable ? (
                  <textarea
                    value={work.description}
                    onChange={(e) => handleInputChange(work._id, 'description', e.target.value)}
                  />
                ) : (
                  <p>{work.description}</p>
                )}
                <br />
                <p>
                  <span>Task Assigned To: {work.editable ? (
                    <input
                      type="text"
                      value={work.taskto}
                      onChange={(e) => handleInputChange(work._id, 'taskto', e.target.value)}
                    />
                  ) : (
                    <span>{work.taskto}</span>
                  )}</span>
                </p>
                <br />
                <p>
                  <span>Duration: {work.editable ? (
                    <input
                      type="text"
                      value={work.duration}
                      onChange={(e) => handleInputChange(work._id, 'duration', e.target.value)}
                    />
                  ) : (
                    <span>{work.duration}</span>
                  )}</span>
                </p>
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
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Works;
