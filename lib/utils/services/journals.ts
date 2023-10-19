// export const createJournal = async (title: string, description: string) => {
//     try {
//         // API call to create journal
//         const res = await fetch("/api/journals/create", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 title,
//                 description
//             })
//         })

//         if (!res.ok) {
//             throw new Error("Could not create journal")
//         }

//         const data = await res.json()

//         return { id: data.id, error: null}
//     } catch (e) {
//         return { id: null, error: e }
//     }
// }