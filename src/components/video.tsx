export function Video(props: { id: string }) {
  const { id } = props;
  return (
    <iframe
      className='w-full h-[480px]'
      src={`https://www.youtube.com/embed?listType=playlist&list=${id}`}
      title='Reclutamiento de Cruzada21'
    />
  );
}
