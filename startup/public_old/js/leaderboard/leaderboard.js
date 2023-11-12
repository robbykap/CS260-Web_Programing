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

document.addEventListener('DOMContentLoaded', function() {

    fetch("/api/lifts")

    .then((response) => response.json())
    .then((data) => {

        // Find max lifts for each user
        const maxLifts = findMaxLifts(data);

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
    });