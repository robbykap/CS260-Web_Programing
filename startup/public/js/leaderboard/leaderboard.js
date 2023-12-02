document.addEventListener('DOMContentLoaded', function() {

  let maxLifts = {};

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

    fetch("/api/lifts")

    .then((response) => response.json())
    .then((info) => {

        // Find max lifts for each user
        maxLifts = findMaxLifts(info);

        const userArray = Object.keys(maxLifts).map(user => ({
            user,
            maxTotalLift: maxLifts[user].maxTotalLift,
            maxLiftData: maxLifts[user].maxLiftData,
          }));

        userArray.sort((a, b) => b.maxTotalLift - a.maxTotalLift);

        userArray.forEach((user, index) => {
            user.rank = index + 1;
          });

        // Add data to table
        userArray.forEach((user) => {
        $("#leaderboard").append(
            "<tr>" +
                "<td>" + user.rank + "</td>" +
                "<td>" + user.user + "</td>" + 
                "<td>" + user.maxLiftData.squat + "</td>" +
                "<td>" + user.maxLiftData.bench + "</td>" +
                "<td>" + user.maxLiftData.deadlift + "</td>" +
                "<td>" + user.maxTotalLift + "</td>" +
            "</tr>"
        );
        });

        // Add DataTables
        $(document).ready(function () {
        $("#leaderboard").DataTable({
            autoWidth: true,
            scrollY: true,
            scrollX: true,
            dom: '<lf<t>Bip>',
            lengthMenu: [
                [10,20,25,50,-1], 
                [10,20,25,50,"All"]
            ],
            columnDefs: [
                {"width" : "100px", "targets": 0},
                {"width" : "250px", "targets": 1},
                {"width" : "70px", "targets": 2},
                {"width" : "70px", "targets": 3},
                {"width" : "70px", "targets": 4},
            ],
            buttons: [
                'csv', 
                {
                extend: 'pdfHtml5',
                orientation: 'landscape',
                pageSize: 'LEGAL'
                },
            ],
            });
        });
  });

  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  socket.binaryType = "arraybuffer";

  socket.addEventListener('message', (event) => {
    console.log(event.data);

    const decoder = new TextDecoder();
    const str = decoder.decode(event.data);
    console.log(str);

    console.log(JSON.parse(str));

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
    
    // sort maxLifts
    const userArray = Object.keys(maxLifts).map(user => ({
      user,
      maxTotalLift: maxLifts[user].maxTotalLift,
      maxLiftData: maxLifts[user].maxLiftData,
    }));

    userArray.sort((a, b) => b.maxTotalLift - a.maxTotalLift);

    userArray.forEach((user, index) => {
      user.rank = index + 1;
    });


  // Update the corresponding row in the DataTable
  $('#leaderboard')
    .DataTable()
    .clear()
    .rows.add(userArray.map((user) => [
      user.rank,
      user.user,
      user.maxLiftData.squat,
      user.maxLiftData.bench,
      user.maxLiftData.deadlift,
      user.maxTotalLift,
    ]))
    .draw();
    }
});