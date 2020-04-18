import camelot
import pandas
import sys

def main(input_pdf, output_csv):
  tables = camelot.read_pdf(input_pdf, flavor='stream', edge_tol=100, pages='all')
  
  dfs = list(map(lambda table: table.df, tables))

  csv = pandas.concat(dfs).to_csv(header=False, index=False)
  
  with open(output_csv, 'w') as fout:
    fout.write(csv)
    
if __name__ == "__main__":
  input_pdf = sys.argv[1]
  output_csv = sys.argv[2]
  main(input_pdf, output_csv)
  

