import PlayersItem from './PlayersItem';

export default function Players({ sample = [] }) {
  const sampleArr = sample.map((item) => {
    return {
      ...item,
      showUser: false,
      showState: false,
    };
  });
  return (
    <div
      className="flex
        flex-col
        md:w-full md:flex-wrap md:flex-row "
    >
      {<PlayersItem sample={sampleArr} />}
    </div>
  );
}
