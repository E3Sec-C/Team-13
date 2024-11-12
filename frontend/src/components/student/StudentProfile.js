import { useState, useEffect } from "react";
import axios from "axios";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = async () => {
    try {
      const url = `http://localhost:5000/api/v1/student/R200083`;
      const response = await axios.get(url);
      setProfile(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  fetchProfile();

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    // Save the updated profile data (you can call the backend to update the data here)
    console.log("Saving updated profile data...");
    setIsEditing(false);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="dark:bg-gray-100 dark:text-gray-900">
      <div className="container grid grid-cols-12 mx-auto">
        <div
          className="flex flex-col justify-center col-span-12 align-middle dark:bg-gray-300 bg-no-repeat bg-cover lg:col-span-6 lg:h-auto"
        >
          <div className="flex flex-col items-center p-8 py-12 text-center dark:text-gray-800">
            <span>12 June</span>
            <h1 className="py-4 text-5xl font-bold">
              Lorem, ipsum dolor sit amet consectetur adipisicing.
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-7 h-7"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

// <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-6 flex">
//         {/* Left Side - Profile Image */}
//         <div className="w-1/3 flex justify-center items-center">
//           <img
//             src={profile.imageUrl || "https://via.placeholder.com/150"}
//             alt={profile.name}
//             className="w-32 h-32 object-cover rounded-lg"
//           />
//         </div>

//         {/* Right Side - Profile Info */}
//         <div className="w-2/3 pl-6">
//           <div className="text-xl font-semibold text-gray-800">
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={profile.name}
//                 onChange={(e) =>
//                   setProfile({ ...profile, name: e.target.value })
//                 }
//                 className="text-2xl font-semibold text-gray-800 border-b border-gray-300 w-full mb-4 p-2"
//               />
//             ) : (
//               <h2>{profile.name}</h2>
//             )}
//           </div>
//           <div className="text-gray-600 mb-2">
//             <strong>Gender: </strong>
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={profile.gender}
//                 onChange={(e) =>
//                   setProfile({ ...profile, gender: e.target.value })
//                 }
//                 className="text-gray-600 w-full mb-4 p-2 border-b border-gray-300"
//               />
//             ) : (
//               <span>{profile.gender}</span>
//             )}
//           </div>
//           <div className="text-gray-600 mb-2">
//             <strong>Phone: </strong>
//             {isEditing ? (
//               <input
//                 type="tel"
//                 value={profile.phone}
//                 onChange={(e) =>
//                   setProfile({ ...profile, phone: e.target.value })
//                 }
//                 className="text-gray-600 w-full mb-4 p-2 border-b border-gray-300"
//               />
//             ) : (
//               <span>{profile.phone}</span>
//             )}
//           </div>

//           {/* Add more fields as needed */}

//           <button
//             onClick={handleEditClick}
//             className="mt-4 text-blue-500 font-medium hover:underline"
//           >
//             {isEditing ? "Cancel" : "Edit Profile"}
//           </button>

//           {isEditing && (
//             <button
//               onClick={handleSaveClick}
//               className="ml-4 text-green-500 font-medium hover:underline"
//             >
//               Save
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
