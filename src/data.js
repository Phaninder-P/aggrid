const phase2 = 
[
    {
     date: ['30th January'],
      Time: '12PM',
      Location: 'Secunderabad',
      Status:'Delivered',
      Description:'Package Delivered'
    },
    {
      date: ['30th January',''],
      Time: '11AM',
      Location: 'Secunderabad',
      Status:'OFD',
      Description:'Package is out for Delivery'
    },
    {
      date: ['30th January',' '],
      Time: '10AM',
      Location: 'Hyderabad',
      Status:'Left',
      Description:'Package left at an Amazon Facility in Hyderabad'
    },
     {
      date: ['29th January'],
      Time: '11AM',
      Location: 'Hyderabad',
      Status:'Arrived',
      Description:'Package arrived at Amazon Facility'
    },
    {
      date: ['28th January'],
      Time: '11AM',
      Location: 'Tamil Nadu',
      Status:'Left',
      Description:'Package left an Amazon Facility'
    },
    {
      date: ['28th January',''],
      Time: '12AM',
      Location: 'Tamil Nadu',
      Status:'PackingFinished',
      Description:'Package is ready to be out'
    },
     {
      date: ['28th January',' '],
      Time: '10AM',
      Location: 'Tamil Nadu',
      Status:'Picked',
      Description:'A carrier picked your package and sent it for packing'
    },
  ];


const phase1 = [
    {
        date: ['28th January'],
        Time: '12PM',
        Location: 'Tamil Nadu',
        Status:'Left',
        Description: 'Package left an Amazon Facility'
      },
      {
        date: ['28th January',''],
        Time: '11AM',
        Location: 'Tamil Nadu',
        Status:'PackingFinished',
        Description:'Package is ready to be out'
      },
      {
        date: ['28th January',' '],
        Time: '10AM',
        Location: 'Tamil Nadu',
        Status:'Picked',
        Description:'A carrier picked your package and sent it for packing'
      },
];
    
export function getData(id){
    if(id === "2" || id === "4" || id === "6") return phase2;
    if(id === "1" || id === "3" || id === "5") return phase1;
    return [] ;
}