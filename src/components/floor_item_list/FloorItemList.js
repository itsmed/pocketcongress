import React from 'react';

import FloorItem from '../floor_item/FloorItem';

const FloorItemList = ({ items, activeChamber, isFetching }) => (
  <div>
    {
      isFetching ?
        <h1>Loading...</h1>
      
      :

        activeChamber && items[activeChamber.toLowerCase()].chamber ?
          <div>
            <div>
              <h4>
                {

                  `${items[activeChamber.toLowerCase()].num_results} Items voted on by the ${items[activeChamber.toLowerCase()].chamber}  ${items[activeChamber.toLowerCase()].month}/${items[activeChamber.toLowerCase()].year}`
                }
              </h4>
            </div>
            <ul>
              {
                activeChamber.toLowerCase() === 'senate' ?
                  items.senate.votes
                    .filter(vote => vote.bill || vote.nomination).map((vote, i) => <li key={i}>
                        <FloorItem
                          chamber='senate'
                          session={ vote.session }
                          item={ vote }
                          rollCall={ vote.roll_call }
                        />

                      </li>)
                :
                  items.house.votes
                    .filter(vote => vote.bill || vote.nomination).map((vote, i) => <li key={i}>
                        <FloorItem
                          chamber='house'
                          session={ vote.session }
                          item={ vote }
                          rollCall={ vote.roll_call }
                        />

                      </li>)
              }
            </ul>
          </div>
        :
          ''
      }
    </div>
);

export default FloorItemList;
