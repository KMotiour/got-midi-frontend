import React, { useState } from 'react';
import { Modal} from 'antd';

import 'antd/dist/antd.css';
import './modal.css'



const ShowYoutubeVideo = ({ open, setShowYoutubeVideo , youtubeID}) => {

  const [visible, setVisible] = useState(open);


  const hangleOnClancel = () => {
    setVisible(false)
    setShowYoutubeVideo(false)
  }

const id = youtubeID
  
  return (
    <>

      <Modal
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={hangleOnClancel}
        width={'auto'}
        footer={[
        ]}
      >
        <div class="content" style={{ borderRightColor: 'gray', marginTop:0, marginBottom:0 }}>
        <iframe width="450" frameborder="0" scrolling="no" height="50" src={`https://www.youtube.com/embed/${youtubeID}?&frameborder=0&enablejsapi=1`} frameborder="0" allowfullscreen></iframe>
        </div>
      </Modal>
    </>
  );
};


export default ShowYoutubeVideo
