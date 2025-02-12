// const Card = () => {
//   return (
//     <div className="bg-white rounded-lg">
//       <div className="p-4">header</div>
//       <hr/>
//       <div className="p-4">main</div>
//     </div>
//   );
// };
// export default Card;


import React from 'react';

const Card = React.memo(({ backgroundColor, title, value }) => {
  return (
    <div style={{background:backgroundColor}} className=" shadow-lg rounded-lg p-6 m-4 max-w-xs w-full">
      <div className="text-xl font-semibold text-white mb-4">
        {title}
      </div>
      <div dir="ltr" className="text-2xl font-bold text-white">
        {value} 
      </div>
    </div>
  );
})

export default Card;
