const Footer = () => {
  return (
    <footer className="border-t-2 border-border py-6 px-6">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs font-bold tracking-wider uppercase text-text">
          © {new Date().getFullYear()} FAISAL KHAN PATHAN
        </p>
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
          Built with React + Tailwind CSS
        </p>
      </div>
    </footer>
  )
}

export default Footer
