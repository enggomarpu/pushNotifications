import React, { Component, useState, useEffect } from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar';
import {Spinner} from 'react-bootstrap';
import HttpService from '../../shared/http.service';
import moment from 'moment';

let userInfo = JSON.parse(localStorage.getItem("user-info"));
let userId = userInfo ? userInfo.userId : null

const Notifications = () =>{
  
  const [openModal, setOpenModal] = useState(false);
  const [openFeaturedModel, setOpenFeaturedModel] = useState(false);
  const [notificationsMessage, setNotificationsMessage] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTime = (date) => {
    return date.toLocaleTimeString("en-US");
  };

  useEffect(() => {
    get()
  }, [])

  const get = async () => {
    await HttpService.get('notifications/full')
      .then((res) => {
        setLoading(false);
        setNotificationsMessage(res.data);
      })
      .catch((err) => {
        console.error('Api Call Error', err)
      })
  }


  return (
    <>
      <Header heading='Dashboard' />

      <div className='main'>
        <div className='siderbar'>
          <Sidebar />
        </div>
        <div className='main-wrapper'>
          <div className='row'>
            <div className='col-md-8'>
              <div className='dashboard-nave d-flex mt-2 mb-3'>
              <div className='d-inline-block'>
              Notifications
                  </div>
              </div>

              <>
        {loading ? <Spinner animation="border" /> :
        notificationsMessage &&
        notificationsMessage.map((notification,index)=>{
              
                return (
                 
                <div className='card simple-card card-border'>
                  <div className='card-body'>
                    <div className='d-flex justify-content-between mb-3'>
                      <div className='align-self-center'>
                        <h4 className='card-title-primary'>{notification.NotificationTitle}</h4>
                        <h3 className='card-title'></h3>
                        <h5 className='card-subtitle'>
                        {notification.NotificationContent}
                        </h5>
                      </div>
                      <div className='right align-self-center'>
                      <p className='time'>
                                {moment(notification.CreatedDate).fromNow()}
                              </p>

                      
                      </div>
                    </div>

                    <p className='card-text'>
                     {notification.PostContent}
                    </p>
                  </div>
                  <div className='card-footer d-flex justify-content-between'>
                  </div>
                </div>
              )})}
        </>


              

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Notifications
