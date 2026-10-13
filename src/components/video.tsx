export function Video(props: { id: string }) {
  const { id } = props;
  return (
    <div className='aspect-video w-full bg-ink-900'>
      <iframe
        className='h-full w-full'
        src={`https://www.youtube.com/embed?listType=playlist&list=${id}`}
        title='Reclutamiento de Cruzada21'
        loading='lazy'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    </div>
  );
}
