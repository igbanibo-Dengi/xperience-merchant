export const mockVenues = [
  {
    id: '1',
    venueName: 'Scotiabank Arena',
    address: '40 Bay St.',
    city: 'Toronto',
    state: 'ON',
    zipCode: 'M5J 2X2',
  },
  {
    id: '2',
    venueName: 'Rogers Centre',
    address: '1 Blue Jays Way',
    city: 'Toronto',
    state: 'ON',
    zipCode: 'M5V 1J1',
  },
  {
    id: '3',
    venueName: 'BMO Field',
    address: "170 Princes' Blvd",
    city: 'Toronto',
    state: 'ON',
    zipCode: 'M6K 3C3',
  },
]

//  useEffect(() => {
//     if (defaultValues?.coverPhoto) {
//       const reader = new FileReader()
//       reader.onload = () => {
//         setCoverPreview(reader.result as string)
//       }
//       reader.readAsDataURL(defaultValues.coverPhoto)
//     }

//     if (defaultValues?.feedPhotos?.length) {
//       Promise.all(
//         defaultValues.feedPhotos.map((file) => {
//           return new Promise<string>((resolve) => {
//             const reader = new FileReader()
//             reader.onload = () => resolve(reader.result as string)
//             reader.readAsDataURL(file)
//           })
//         })
//       ).then(setFeedPreviews)
//     }
//   }, [defaultValues])

// {

//   "name": "Igbanibo Dengimo-owei Alex",
//     "phoneNumber": "+2348107438135",
//       "email": "igbanibodengi@gmail.com",
//         "password": "123123123",
//           "confirmPassword": "123123123",
//             "companyName": "CAPACITY BAY",
//               "industryType": "tech",
//                 "address": "Port-harcourt, Rivers state",
//                   "city": "Port-Harcourt, Rivers, Nigeria",
//                     "state": "BY:BAYELSA STATE",
//                       "zipCode": "500211",
//                         "country": "ca",
//                           "userType": "organizer"
// }
