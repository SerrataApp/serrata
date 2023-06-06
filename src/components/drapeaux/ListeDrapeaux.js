export default function ListeDrapeaux() {
  const importAll = (r) => r.keys().map(r);
  const images = importAll(require.context('../../img/drapeaux', false, /\.(png)$/));

  return (
    <div>
      {images.map((image, index) => {
        const fileName = image.split('/').pop().split('.')[0].split('_').join(' ');
        return (
          <div key={index}>
            <img src={`data:image/png;base64,${image}`} alt={`Image ${index + 1}`} />
            <p>{fileName}</p>
          </div>
        );
      })}
    </div>
  );
}