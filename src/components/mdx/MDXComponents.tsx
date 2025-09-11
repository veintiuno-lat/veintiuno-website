export const mdxComponents = {
  h1: (props: any) => <h1 className='text-5xl md:text-6xl text-gray-900 mb-8 leading-tight' {...props} />,
  h2: (props: any) => (
    <h2
      className='text-4xl md:text-5xl text-gray-900 mb-8 mt-16 leading-tight border-b border-gray-100 pb-6'
      {...props}
    />
  ),
  h3: (props: any) => <h3 className='text-3xl md:text-4xl text-bitcoin mb-6 mt-12 leading-tight' {...props} />,
  h4: (props: any) => <h4 className='text-2xl md:text-3xl text-gray-900 mb-4 mt-8 leading-tight' {...props} />,
  h5: (props: any) => <h5 className='text-xl md:text-2xl text-gray-900 mb-3 mt-6 leading-tight' {...props} />,
  h6: (props: any) => <h6 className='text-lg md:text-xl text-gray-900 mb-3 mt-4 leading-tight' {...props} />,
  p: (props: any) => <p className='text-gray-700 leading-relaxed mb-6 text-lg' {...props} />,
  ul: (props: any) => <ul className='space-y-3 mb-8 ml-6' {...props} />,
  ol: (props: any) => <ol className='space-y-3 mb-8 ml-6' {...props} />,
  li: (props: any) => (
    <li className='text-gray-700 leading-relaxed text-lg relative pl-2'>
      <span className='absolute -left-6 top-0 text-bitcoin font-medium'>•</span>
      {props.children}
    </li>
  ),
  blockquote: (props: any) => (
    <blockquote
      className='border-l-4 border-bitcoin pl-8 pr-4 py-6 my-8 bg-gray-50 rounded-r-xl italic text-gray-700 text-lg leading-relaxed'
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className='bg-gray-100 px-3 py-1 rounded-md text-sm font-mono text-bitcoin border border-custom-border'
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre className='bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto mb-8 border border-custom-border shadow-minimal'>
      <code className='text-sm font-mono leading-relaxed' {...props.children?.props} />
    </pre>
  ),
  a: (props: any) => (
    <a
      className='text-bitcoin hover:text-bitcoin-dark underline decoration-2 underline-offset-2 transition-colors duration-200 font-medium'
      {...props}
    />
  ),
  strong: (props: any) => <strong className='font-bold text-gray-900' {...props} />,
  em: (props: any) => <em className='italic text-gray-800' {...props} />,
  hr: (props: any) => (
    <hr className='border-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-12' {...props} />
  ),
  table: (props: any) => (
    <div className='overflow-x-auto my-8'>
      <table className='min-w-full border border-custom-border rounded-lg overflow-hidden' {...props} />
    </div>
  ),
  thead: (props: any) => <thead className='bg-gray-50' {...props} />,
  tbody: (props: any) => <tbody className='divide-y divide-gray-200' {...props} />,
  tr: (props: any) => <tr className='hover:bg-gray-50 transition-colors duration-150' {...props} />,
  th: (props: any) => (
    <th className='px-6 py-4 text-left text-bolt-sm text-gray-900 border-b border-custom-border' {...props} />
  ),
  td: (props: any) => <td className='px-6 py-4 text-sm text-gray-700' {...props} />,
  img: (props: any) => <img className='rounded-xl shadow-minimal-lg my-8 w-full' {...props} />,
};
