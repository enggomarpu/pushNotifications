import React, { Component, useEffect, useState } from 'react'
import CardImg from '../../../src/img/card-img.png'
import MedTech from '../../../src/img/medTech.png'
import DataCorp from '../../../src/img/dataCorp.png'
import NeutralTech from '../../../src/img/neutralTech.png'
import BestSoftware from '../../../src/img/bestSoftware.png'
import AiSolutions from '../../../src/img/aiSolutions.png'
import { Link, Route } from 'react-router-dom'
import DashboardCalendar from './CalenderEvents/dashboard-calendar'
import UpcomingEvents from './CalenderEvents/upcoming-events.component'
import HttpService from '../../shared/http.service';
import FeaturedPostModal from './post/FeaturedPost/featured-post-modal.component'
import FeaturedPostComponent from './post/FeaturedPost/featured-post.component'
import PostModel from './post/AdminPost/post-modal'
import Posts from './post/AdminPost/post.component'
import Pushy from 'pushy-sdk-web';

let userInfo = JSON.parse(localStorage.getItem("user-info"));
let userId = userInfo ? userInfo.userId : null

const AdminDashboardComponent = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [openFeaturedModel, setOpenFeaturedModel] = useState(false);

  useEffect(()=>{
    props.setPageTitle();
  },[openModal]);

  Pushy.setNotificationListener(function (data) {
    // Print notification payload data
    console.log('Received notification: ' + JSON.stringify(data));

    // Attempt to extract the "message" property from the payload: {"message":"Hello World!"}
    let message = data.message || 'Test notification';

    // Display an alert with message sent from server
    alert('Received notification: ' + message);
  });

  return (
    <>
      <div className='row'>
        <div className='col-md-8'>
          <div className='dashboard-nave d-flex mt-2 mb-3'>
            <div className='d-inline-block'>
              <a
                className='link dropdown-toggle'
                href='/'
                id='dropdownMenuButton1'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                Dropdown button
                  </a>
              <ul
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton1'
              >
                <li>
                  <a className='dropdown-item' href='/'>
                    Action
                      </a>
                </li>
                <li>
                  <a className='dropdown-item' href='/'>
                    Another action
                      </a>
                </li>
                <li>
                  <a className='dropdown-item' href='/'>
                    Something else here
                      </a>
                </li>
              </ul>
            </div>
            <div className='nave-border'></div>
            {/* <Link
              to='/pendingposts'
              className='btn btn-primary btn-width'
            >
              Approve Pending Posts
                </Link> */}
            <button className='btn btn-primary btn-width' onClick={() => setOpenFeaturedModel(true)}>
              Add Featured Post
                </button>
            <button className='btn btn-primary btn-width' onClick={() => setOpenModal(true)}>
              Add a Post
                </button>
          </div>

          <FeaturedPostComponent />
          <Posts />

          <div className='card simple-card'>
            <div className='card-header bg-white d-flex justify-content-between'>
              <div className='align-self-center'>
                <h3 className='card-title'>Training</h3>
              </div>
              <div className='btn-pane align-self-center'>
                <a href='/' className='card-link'>
                  Subscribe
                    </a>
                <a href='/' className='card-link'>
                  Share
                    </a>
              </div>
            </div>

            <div className='card-body'>
              <h3 className='card-title mb-3'>
                AWS Cloud Practitioner Essentials
                  </h3>
              <h5 className='card-subtitle mb-3'>48 minutes ago</h5>
              <p className='card-text'>
                This advanced course demonstrates how to integrate testing
                and security into continous integration (CI), continuous
                delivery (CD), continour deployement (CD) pipelines. You
                will learn...
                    <a href='/' className='card-link'>
                  Read More
                    </a>
              </p>
              <div className='text-end'>
                <a href='/' className='card-link'>
                  <i
                    className='far fa-hand-point-right'
                    aria-hidden='true'
                  ></i>
                </a>
                <a href='/' className='card-link'>
                  <i className='far fa-star' aria-hidden='true'></i>
                </a>
                <a href='/' className='card-link'>
                  <i
                    className='far fa-comment-alt'
                    aria-hidden='true'
                  ></i>
                </a>
              </div>
            </div>
          </div>

          <div className='card simple-card'>
            <div className='card-header bg-white d-flex justify-content-between'>
              <div className='align-self-center'>
                <h3 className='card-title'>Collaboration Request</h3>
              </div>
              <div className='btn-pane align-self-center'>
                <a href='/' className='card-link'>
                  Subscribe
                    </a>
                <a href='/' className='card-link'>
                  Share
                    </a>
              </div>
            </div>

            <div className='card-body'>
              <h4 className='card-title-primary'>Neutral Tech</h4>
              <h5 className='card-subtitle mb-2'>
                New York, New York | 48 minutes ago
                  </h5>
              <p className='card-text'>
                We are seeking an affliliate who has experience with
                project work in the manifufactoring industry. This project
                is focused on operation optimization EventModal their
                production plants. The lenght of the project is projected
                to be 3-4 months. Please reach out if you are interested
                in collaborating or learning more about the project!
                  </p>
            </div>
            <div className='card-footer d-flex justify-content-between'>
              <div className='align-self-center'>
                <a href='/' className='btn btn-primary btn-width'>
                  I’m Interested!
                    </a>
              </div>
              <div className='align-self-center'>
                <a href='/' className='card-link'>
                  <i
                    className='far fa-hand-point-right'
                    aria-hidden='true'
                  ></i>
                </a>
                <a href='/' className='card-link'>
                  <i className='far fa-star' aria-hidden='true'></i>
                </a>
                <a href='/' className='card-link'>
                  <i
                    className='far fa-comment-alt'
                    aria-hidden='true'
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-4'>
          <div className='card simple-card'>
            <div className='card-body'>
              <DashboardCalendar />
              <UpcomingEvents />
            </div>
          </div>
          <div className='card simple-card'>
            <div className='card-body p-4'>
              <h3 className='card-title'>Featured Affiliates</h3>
              <div className='featured-affiliates'>
                <ul>
                  <li>
                    <div className='logo'>
                      <img src={MedTech} alt='' />
                    </div>
                    <div className='text'>MedTech</div>
                  </li>
                  <li>
                    <div className='logo'>
                      <img src={DataCorp} alt='' />
                    </div>
                    <div className='text'>MedTech</div>
                  </li>
                  <li>
                    <div className='logo'>
                      <img src={NeutralTech} alt='' />
                    </div>
                    <div className='text'>MedTech</div>
                  </li>
                  <li>
                    <div className='logo'>
                      <img src={BestSoftware} alt='' />
                    </div>
                    <div className='text'>MedTech</div>
                  </li>
                  <li>
                    <div className='logo'>
                      <img src={AiSolutions} alt='' />
                    </div>
                    <div className='text'>MedTech</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeaturedPostModal
        show={openFeaturedModel}
        onHide={() => setOpenFeaturedModel(false)}
      />
      <PostModel
        show={openModal}
        onHide={() => setOpenModal(false)}
      />
    </>
  )
}

export default AdminDashboardComponent
