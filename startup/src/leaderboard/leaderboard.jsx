import React, { useEffect, useState } from 'react';

import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'datatables.net-bs4'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../app.css';

function findMaxLifts(data) {
  const userMaxLifts = {};

  for (const userEntry of data) {
    const user = userEntry.user;
    const lifts = userEntry.lifts;

    let maxTotalLift = 0;
    let maxLiftData = null;

    for (const liftEntry of lifts) {
      const liftData = liftEntry.lifts;
      const totalLift = liftData.squat + liftData.bench + liftData.deadlift;

      if (totalLift > maxTotalLift) {
        maxTotalLift = totalLift;
        maxLiftData = liftData;
      }
    }

    userMaxLifts[user] = { maxLiftData, maxTotalLift };
  }

  return userMaxLifts;
}

function sortLifts(maxLifts) {
  const userArray = Object.keys(maxLifts).map(user => ({
    user,
    maxTotalLift: maxLifts[user].maxTotalLift,
    maxLiftData: maxLifts[user].maxLiftData,
  }));

  userArray.sort((a, b) => b.maxTotalLift - a.maxTotalLift);

  userArray.forEach((user, index) => {
    user.rank = index + 1;
  });

  const dictionaryObject = userArray.reduce((accumulator, currentValue) => {
    accumulator[currentValue.user] = currentValue;
    return accumulator;
  }, {});

  return dictionaryObject;
}


export function Leaderboard() {
    const [maxLifts, setMaxLifts] = useState({});

    useEffect(() => {
        fetch("/api/lifts")
          .then((response) => response.json())
          .then((info) => {
            // Find max lifts for each user
            const maxLifts = findMaxLifts(info);
            console.log(maxLifts);

            const maxLiftData = sortLifts(maxLifts);

            console.log(maxLiftData)

            setMaxLifts(maxLiftData);
            
        });
    }, []);

    useEffect(() => {
        const leaderboardTable = $("#leaderboard").DataTable({
          autoWidth: true,
          scrollY: true,
          scrollX: true,
          dom: '<lf<t>Bip>',
          lengthMenu: [
            [10, 20, 25, 50, -1],
            [10, 20, 25, 50, 'All'],
          ],
          columnDefs: [
            { width: '100px', targets: 0 },
            { width: '250px', targets: 1 },
            { width: '70px', targets: 2 },
            { width: '70px', targets: 3 },
            { width: '70px', targets: 4 },
          ],
          buttons: ['csv', { extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL' }],
        });

        const array = Object.values(maxLifts);

        if (array.length > 0) {
          array.forEach((entry) => {
            const { rank, user, maxLiftData, maxTotalLift } = entry;
            const { squat, bench, deadlift } = maxLiftData;
            leaderboardTable.row.add([rank, user, squat, bench, deadlift, maxTotalLift]).draw();
            });
        }

        return () => leaderboardTable.destroy();
      }, [maxLifts]); 

      useEffect(() => {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        socket.binaryType = 'arraybuffer';
    
        socket.addEventListener('message', (event) => {
          const decoder = new TextDecoder();
          const str = decoder.decode(event.data);
          const newLiftData = JSON.parse(JSON.parse(str).data);
          console.log(newLiftData);
          updateLeaderboard(newLiftData);
        });
    
        function updateLeaderboard(newLiftData) {
          const user = newLiftData.user;
          const lifts = newLiftData.lift.lifts;
          const totalLift = lifts.squat + lifts.bench + lifts.deadlift;

          if (!maxLifts[user]) {
            maxLifts[user] = { maxLiftData: lifts, maxTotalLift: totalLift };
          }
          
          else {
          const maxTotalLift = maxLifts[user].maxTotalLift;
          const maxLiftData = maxLifts[user].maxLiftData;
      
          const newMaxTotalLift = Math.max(maxTotalLift, totalLift);
          const newMaxLiftData = maxTotalLift === newMaxTotalLift ? maxLiftData : lifts;
      
          maxLifts[user] = { maxLiftData: newMaxLiftData, maxTotalLift: newMaxTotalLift };
          }

          console.log(maxLifts)
    
          const userArray = sortLifts(maxLifts);

          console.log(userArray)

          const array = Object.values(userArray);
    
          // Update the corresponding row in the DataTable
          $('#leaderboard')
            .DataTable()
            .clear()
            .rows.add(
              array.map((user) => [
                user.rank,
                user.user,
                user.maxLiftData.squat,
                user.maxLiftData.bench,
                user.maxLiftData.deadlift,
                user.maxTotalLift,
              ])
            )
            .draw();
        }
    
        return () => {
          socket.close();
        };
      }, [maxLifts]);
    
    return (
        <main className="d-flex">
            <div className="bg-dark p-5 m-3 mt-0 rounded-3">
                <h1 className="text-center" style={{ fontWeight: 'bold' }}>
                Leaderboard
                </h1>
                <br />
                <table id="leaderboard" className="table hover" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Squat</th>
                            <th>Bench</th>
                            <th>Deadlift</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data} */}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Squat</th>
                            <th>Bench</th>
                            <th>Deadlift</th>
                            <th>Total</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </main>
)
}
