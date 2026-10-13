import type {
  AnchorHTMLAttributes,
  BlockquoteHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  OlHTMLAttributes,
  ReactElement,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";

type CodeChild = ReactElement<HTMLAttributes<HTMLElement>>;

export const mdxComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className='text-5xl md:text-6xl text-white mb-8 leading-tight' {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className='text-4xl md:text-5xl text-white mb-8 mt-16 leading-tight border-b border-white/10 pb-6'
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className='text-3xl md:text-4xl text-bitcoin mb-6 mt-12 leading-tight' {...props} />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className='text-2xl md:text-3xl text-white mb-4 mt-8 leading-tight' {...props} />
  ),
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className='text-xl md:text-2xl text-white mb-3 mt-6 leading-tight' {...props} />
  ),
  h6: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className='text-lg md:text-xl text-white mb-3 mt-4 leading-tight' {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className='text-gray-300 leading-relaxed mb-6 text-lg' {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className='space-y-3 mb-8 ml-6' {...props} />
  ),
  ol: (props: OlHTMLAttributes<HTMLOListElement>) => (
    <ol className='space-y-3 mb-8 ml-6' {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className='text-gray-300 leading-relaxed text-lg relative pl-2'>
      <span className='absolute -left-6 top-0 text-bitcoin font-medium'>•</span>
      {props.children}
    </li>
  ),
  blockquote: (props: BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className='border-l-4 border-bitcoin pl-8 pr-4 py-6 my-8 bg-bitcoin/5 rounded-r-xl italic text-gray-200 text-lg leading-relaxed'
      {...props}
    />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className='bg-white/5 px-1.5 py-0.5 rounded-md text-sm font-mono text-bitcoin border border-white/10'
      {...props}
    />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => {
    const childProps = (props.children as CodeChild | undefined)?.props;
    return (
      <pre className='bg-ink-900 text-gray-100 p-6 rounded-2xl overflow-x-auto mb-8 border border-white/10'>
        <code className='text-sm font-mono leading-relaxed' {...childProps} />
      </pre>
    );
  },
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className='text-bitcoin hover:text-glow underline decoration-2 underline-offset-2 transition-colors duration-200 font-medium'
      {...props}
    />
  ),
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong className='font-bold text-white' {...props} />
  ),
  em: (props: HTMLAttributes<HTMLElement>) => (
    <em className='italic text-gray-200' {...props} />
  ),
  hr: (props: HTMLAttributes<HTMLHRElement>) => (
    <hr className='border-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent my-12' {...props} />
  ),
  table: (props: TableHTMLAttributes<HTMLTableElement>) => (
    <div className='overflow-x-auto my-8'>
      <table className='min-w-full border border-white/10 rounded-2xl overflow-hidden' {...props} />
    </div>
  ),
  thead: (props: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className='bg-white/[0.04]' {...props} />
  ),
  tbody: (props: HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className='divide-y divide-white/10' {...props} />
  ),
  tr: (props: HTMLAttributes<HTMLTableRowElement>) => (
    <tr className='hover:bg-white/[0.03] transition-colors duration-150' {...props} />
  ),
  th: (props: ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className='px-6 py-4 text-left text-sm font-semibold text-white border-b border-white/10' {...props} />
  ),
  td: (props: TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className='px-6 py-4 text-sm text-gray-300' {...props} />
  ),
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
    <img className='rounded-2xl border border-white/10 my-8 w-full' loading='lazy' decoding='async' {...props} />
  ),
};
