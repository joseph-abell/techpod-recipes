import Link from 'next/link';

export default function Header({ title }) {
  return <h1 className="title">
    <Link href='/'>{title}</Link>
  </h1>
}
