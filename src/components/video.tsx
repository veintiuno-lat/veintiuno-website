export function Video(props: { id: string }) {
  const { id } = props;
  return (
    <div className="w-full aspect-video">
      <iframe
        className='w-full h-full'
        src={`https://www.youtube.com/embed?listType=playlist&list=${id}`}
        title='Reclutamiento de Cruzada21'
      />
    </div>
  );
}
