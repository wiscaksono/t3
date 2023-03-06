function classNames(...classes: Array<String>) {
  return classes.filter(Boolean).join(" ");
}

export default classNames;
