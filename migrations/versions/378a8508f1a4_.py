"""empty message

Revision ID: 378a8508f1a4
Revises: 
Create Date: 2020-07-03 14:38:00.794338

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '378a8508f1a4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('master_diagnostics',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('rate', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('master_medicine',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('rate', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('patients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ssn', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('admited_on', sa.DateTime(), nullable=True),
    sa.Column('type_of_bed', sa.String(length=128), nullable=False),
    sa.Column('address', sa.String(length=1000), nullable=False),
    sa.Column('state', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=255), nullable=False),
    sa.Column('discharged', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('ssn')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('username', sa.String(length=128), nullable=False),
    sa.Column('password', sa.String(length=128), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('role', sa.String(length=128), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('diagnostics',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('diagnostic', sa.Integer(), nullable=False),
    sa.Column('patient', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['diagnostic'], ['master_diagnostics.id'], ),
    sa.ForeignKeyConstraint(['patient'], ['patients.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('medicines',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('medicine', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('patient', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['medicine'], ['master_medicine.id'], ),
    sa.ForeignKeyConstraint(['patient'], ['patients.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('medicines')
    op.drop_table('diagnostics')
    op.drop_table('users')
    op.drop_table('patients')
    op.drop_table('master_medicine')
    op.drop_table('master_diagnostics')
    # ### end Alembic commands ###
