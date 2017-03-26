export default data => data;

// export default (data) => {
//   const iter = (item) => {
//     const { type, name, status, after, before, children } = item;
//
//     if (item.type === 'list') {
//       return {
//         name,
//         type,
//         status,
//         children: children.map(iter),
//       };
//     }
//
//     const result = {
//       name,
//       type,
//       before,
//       after,
//     };
//
//     if (!status) {
//       return result;
//     }
//
//     return {
//       ...result,
//       status,
//     };
//   };
//
//   return data.map(iter);
// };
