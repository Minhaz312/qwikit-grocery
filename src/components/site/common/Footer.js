export default function Footer() {
  return (
    <div className="bg-slate-950 p-3">
      <div className="cs-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <h3 className="text-slate-200 font-bold text-2xl">QWIKIGrocery</h3>
          <p className="my-3 text-slate-400 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </p>
        </div>
        <div>
          <h3 className="text-slate-200 font-bold text-md">Quick Links</h3>
          <ul className="my-3 text-slate-400 text-sm">
            <li>Home</li>
            <li>Affiliation</li>
            <li>Privacy & Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div>
          <h3 className="text-slate-200 font-bold text-md">Our Address</h3>
          <p className="my-3 text-slate-400 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
        </div>
      </div>
      <div className="py-3 mt-3 border-t border-slate-500 text-white text-sm text-center">&copy;copyright {new Date().getFullYear()}. All right reserved</div>
    </div>
  )
}
