export const profileEditApi = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //   resolve(loc.data.slice(index * 10, (index + 1) * 10));
      resolve('successfully edited.');
    }, 2000);
  });
};
