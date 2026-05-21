from crewai import Crew, Process
from agent import planner, writer, editor, translator_kor
from tasks import plan, write, edit, translate

def create_crew():
  crew = Crew(
    agents = [planner, writer, editor, translator_kor],
    tasks = [plan, write, edit, translate],
    process=Process.sequential, # 작업 순서를 순차적으로 수행하도록 지정하는 모듈
    verbose = True
  )
  return crew
