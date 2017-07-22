import React from 'react';

import RepPosition from '../rep_position/RepPosition';

const RepPositions = ({reps, chamber, session, rollcall, congress}) => (
  <div>
  {
    Object.values(reps).map(rep => {

      if (chamber === 'senate' && 
        rep.role.toLowerCase().indexOf('senator') > -1) {

        return <RepPosition
          repId={rep.id}
          key={rep.id}
          congress={congress}
          chamber={chamber}
          session={session}
          rollcall={rollcall}
          rep={rep}
          />;
      } else if (chamber === 'house' && 
        rep.role.toLowerCase().indexOf('representative') > -1) {

        return <RepPosition
          repId={rep.id}
          key={rep.id}
          congress={congress}
          chamber={chamber}
          session={session}
          rollcall={rollcall}
          rep={rep}
          />;
      } else {
        console.log('other');
        return '';
      }
    })
  }
  </div>
  );

export default RepPositions;