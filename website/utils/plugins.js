// export const areaCodeBlog = async ({ req, res }) => {
//     // Get Blog Link For Area Code Page
//     if (req.route_config.template === "phone_areacode") {

//         const blogResponse = await fetch(`https://www.intelius.com/blog/${req.urlparams[0].areacode}-area-code/`, {
//             method: 'HEAD',
//             headers: {
//                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
//                 'Accept': '*/*',
//                 'Referer': `https://www.intelius.com/${req.urlparams[0].areacode}-area-code/`
//               }
//         });

//         if (blogResponse.status === 200) {
//             req.areaCodeBlog = `https://www.intelius.com/blog/${req.urlparams[0].areacode}-area-code/`;
//         } else {
//             if(blogResponse.status != 404) console.log(blogResponse);
//             if ([415, 737, 323, 209, 646, 213, 626, 424, 917, 206, 212, 347].includes(parseInt(req.urlparams[0].areacode))) {
//                 req.areaCodeBlog = `https://www.intelius.com/blog/${req.urlparams[0].areacode}-area-code/`;
//             }
//         }
//     }
// }

