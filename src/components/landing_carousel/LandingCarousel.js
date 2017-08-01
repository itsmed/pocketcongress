import React from 'react';
import {
  Carousel,
  Image,
} from 'react-bootstrap';

const LandingCarousel = (props) => (
  <div style={{borderStyle: 'solid', padding: '3em', margin: '2em', backgroundColor: 'black'}}>
    <Carousel>
      <Carousel.Item>
        <Image responsive src={require('../../images/screenshots/senate_bill_user_voted.png')} />
        <Carousel.Caption>
          <h5>See How Your Reps Vote</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image responsive src={require('../../images/screenshots/floor_items_senate.png')} />
        <Carousel.Caption>
          <h5>Find Items Voted On By The Senate</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image responsive src={require('../../images/screenshots/floor_items_house.png')} />
        <Carousel.Caption>
          <h5>Find Items Voted On By The House</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image responsive src={require('../../images/screenshots/fake_profile_disagree_agree.png')} />
        <Carousel.Caption>
          <h5>See How Often You Agree or Disagree</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image responsive src={require('../../images/screenshots/floor_items_house.png')} />
        <Carousel.Caption>
          <h5>See What the House Voted On</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image responsive src={require('../../images/screenshots/house_bill_user_not_voted_summary_short.png')} />
        <Carousel.Caption>
          <h5>See Details of the Bills</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image responsive src={require('../../images/screenshots/fake_profile_agree.png')} />
        <Carousel.Caption>
          <h5>See How Often You Agree or Disagree</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image responsive src={require('../../images/screenshots/house_bill_user_not_voted_summary_long.png')} />
        <Carousel.Caption>
          <h5>See the Bill Details or Text</h5>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image responsive src={require('../../images/screenshots/floor_items_senate.png')} />
        <Carousel.Caption>
          <h5>See What the Senate Voted On</h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
);

export default LandingCarousel;
