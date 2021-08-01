export const onSnapshot = (ref, callback, options) => {
  ref.onSnapshot(
    (snapshot) => {
      let items = snapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      // items = options && options.sort ? items.sort(options.sort) : items;
      callback(items);
    },
    (error) => {
      console.log("Loggedout Snapshot");
    }
  );
};
